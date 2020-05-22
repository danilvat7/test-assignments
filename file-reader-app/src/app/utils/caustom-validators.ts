import { FormControl, ValidatorFn } from '@angular/forms';

/**
 * Custom validation functions
 */
export const customValidators = {
  requiredFileType(type: string): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {
      const file = control.value;
      if (file) {
        const extension = file.name.split('.')[1].toLowerCase();
        if (type.toLowerCase() !== extension.toLowerCase()) {
          return {
            requiredFileType: true,
          };
        }

        return null;
      }

      return null;
    };
  },
};
