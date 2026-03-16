import { CommonModule } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css',
})
export class FileUpload {
  uploadService = inject(FileUploadService);
  authService = inject(AuthService);
  currentFile: File | undefined;
  progress = 0;
  message = '';
  fileInfos: Observable<any> | undefined = undefined;
  modalRef: any;

  user = this.authService.user();

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles(this.user?.email);
    this.fileInfos.subscribe((values) => {
      console.log(values);
    });
  }

  selectFile(event: any): void {
    this.currentFile = event.target.files[0];
  }

  upload(): void {
    if (this.currentFile) {
      this.uploadService.upload(this.currentFile).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(
              (100 * event.loaded) / event.total,
            );
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.fileInfos = this.uploadService.getFiles(this.user?.email);
          }
        },
        error: (err: any) => {
          console.log(err);

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }

          this.currentFile = undefined;
          this.progress = 0;
        },
        complete: () => {
          this.currentFile = undefined;
        },
      });
    }
  }
}
