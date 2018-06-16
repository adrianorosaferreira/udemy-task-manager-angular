import { FormGroup } from '@angular/forms';

export class FormUtils {
    public constructor(private form: FormGroup) { }

    public fieldClassForErrorOrSuccess(fieldName: string) {
        return {
            'has-error' : this.showFieldError(fieldName),
            'has-success' : this.getField(fieldName).valid
        };
    }

    public iconClassErroOrSuccess(fieldName: string) {
        return {
            'glyphicon-ok': this.getField(fieldName).valid,
            'glyphicon-remove': this.showFieldError(fieldName)
        };
    }

    public showFieldError(fieldName: string): boolean {
        const field = this.getField(fieldName);
        return field.invalid && (field.touched || field.dirty);
    }

    public getField(fieldName: string) {
        return this.form.get(fieldName);
    }
}
