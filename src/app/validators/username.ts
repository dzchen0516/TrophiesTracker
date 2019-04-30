import { FormControl } from '@angular/forms';

export class UsernameValidator {

    static isValid(control: FormControl): any {
		
		if( control.value.length > 30){
			return {
				"Cant show this message on screen..." : true
			};
		}

        return null;
    }

}
