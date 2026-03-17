import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule,FormsModule],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css',
})
export class FileUpload {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  uploadService = inject(FileUploadService);
  authService = inject(AuthService);
  
  currentFile = signal<File | undefined>(undefined);
  progress = 0;
  
  message = '';
  fileInfos: Observable<any> | undefined = undefined;
  modalRef: any;

  user = this.authService.user();

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles(this.user?.email);
    this.fileInfos.subscribe((values) => {
      console.log("fileInfos",values);
    });

    this.progress = 0;
  }

  selectFile(event: any): void {
    const input = event.target as HTMLInputElement;
    this.message = '';

    if (!input.files || input.files.length === 0) {
      this.currentFile.set(undefined);
      return;
    }

    const file = input.files[0]
    const permitTypes = ["dxf", "png", "jpeg", "jpg"];
    const checkFileType = permitTypes.includes(file.name.toLowerCase().split(".")[1]);
    const checkFileSize = (file.size / 1024) < 13000
    if (!(checkFileSize && checkFileType))
      this.message = "Wrong file type or size more than 16MB"
    
    this.currentFile.set(file);;
    console.log("File:", this.currentFile);
  }

  upload(): void {
    if (this.currentFile) {
      this.uploadService.upload(this.currentFile()!, this.user?.email!).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round((100 * event.loaded) / event.total);
            console.log(`Progress for file ${this.progress}%`);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.uploadService.getFiles(this.user?.email);
            console.log("fileInfos", this.fileInfos);
          }
        },
        error: (err: any) => {
          console.log(err);

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile.set(undefined);
          this.progress = 0;
        },
        complete: () => {
          this.currentFile.set(undefined);
        },
      });
    }
  }
}
