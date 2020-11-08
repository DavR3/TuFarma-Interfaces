import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export function transformError(error: HttpErrorResponse | string) {
    let errorMenssage = 'An unknown error has ocurred';
    if(typeof error === 'string'){
        errorMenssage = error;
    } else if(error.error instanceof ErrorEvent){
        errorMenssage = `Error| ${error.error.message}`;
    } else if(error.status){
        errorMenssage = `Reqruest faild with ${error.status} ${error.statusText}`;
    }
    return throwError(errorMenssage);
}
