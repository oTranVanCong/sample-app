import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError, of } from 'rxjs';
import { HttpCode } from '../app.const';

export const httpInterceptor: HttpInterceptorFn = (request, next) => {
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      return handleError(error);
    })
  )
};

const addHeaders = (request: HttpRequest<unknown>): HttpHeaders => {
  let headers = request.headers;

  // Add accessToken to request's header for JWT authentication
  // headers = headers.set('Authorization', `Bearer ${accessToken}`);
  
  return headers;
}

const handleError = (error: HttpErrorResponse): Observable<any> => {
  let alert: boolean = false;
    const errorCode  = error.status;
    if (error.status === HttpCode.UnAuthorized) {
      // In case expired token, we should handle refresh token here

    } else if (errorCode === HttpCode.BadRequest) {
      alert = true;
      // Alert error message to user
    } else if (errorCode === HttpCode.NotFound) {
      alert = true;
      // Alert error message to user
    } else if (errorCode === HttpCode.InternalError) {
      alert = true;
      // Alert error message to user
    } else if (errorCode === HttpCode.Forbidden) {
      alert = true;
      // Alert error message to user
    }

    return alert ? of(null) : throwError(() => error);
}
