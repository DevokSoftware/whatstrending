import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { NEVER, Observable, Subscription, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpStatusService } from './http-status.service';



@Injectable({
  providedIn: 'root'
})
export class CustomHttpInterceptor implements HttpInterceptor {
  private loadingCalls = 0;
  constructor(private httpStatusService: HttpStatusService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      url: req.url.replace("#", "%23")
    })

    this.changeStatus(true, req.method);

    return next.handle(newReq).pipe(
      catchError(e => {
        if (e.status === 400) {
          this.httpStatusService.validationErrors =
            e.error.validationErrors;
          return NEVER;
        }
        return throwError(e);
      }),
      finalize(() => {
        this.changeStatus(false, req.method);
      })
    );
  }
  private changeStatus(val: boolean, method: string): void {
    val ? this.loadingCalls++ : this.loadingCalls--;
    this.httpStatusService.loading = this.loadingCalls > 0;
  }
}