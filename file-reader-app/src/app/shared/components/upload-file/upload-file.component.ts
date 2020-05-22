import {
  Component,
  forwardRef,
  HostListener,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const defaultLabel = 'Choose a file';

/**
 * Upload File Component
 * Custom upload file input
 */
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true,
    },
  ],
})
export class UploadFileComponent implements ControlValueAccessor {
  @Input() set btnLabel(val: string) {
    val = val || defaultLabel;
    this.label = val;
  }
  @Output() fileChange = new EventEmitter<File>();

  label = defaultLabel;

  private file: File | null = null;
  private onChange: any = () => {};
  private onTouch: any = () => {};

  @HostListener('change', ['$event.target.files']) emitFile(
    event: FileList
  ): void {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    this.fileChange.emit(file);
  }

  @HostListener('click') onClick(event: FileList): void {
    this.onTouch();
  }

  constructor(private host: ElementRef<HTMLInputElement>) {}

  writeValue(value: File | null) {
    this.file = value;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
}
