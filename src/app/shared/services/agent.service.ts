import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AIRequest } from '../interfaces/cad/ai-request';
import { AIResponse } from '../interfaces/cad/ai-response';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient) {}

  execute(request: AIRequest): Observable<AIResponse> {

    return this.http.post<AIResponse>(
      "http://localhost:5000/agent",
      request
    );

  }

}