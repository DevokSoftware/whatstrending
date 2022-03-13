import { Injectable } from "@angular/core";
import { ValidationErrors } from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class HttpStatusService {
    private validationErrorsSub$ = new Subject<ValidationErrors[]>();

    private loadingSub$ = new ReplaySubject<boolean>(1);

    //convert subjects into observables
    getvalidationErrors$ = this.validationErrorsSub$.asObservable();
    loading$ = this.loadingSub$.pipe(distinctUntilChanged());

    //setters
    set validationErrors(errors: ValidationErrors[]) {
        this.validationErrorsSub$.next(errors);
    }

    set loading(val: boolean) {
        this.loadingSub$.next(val);
    }
    
}