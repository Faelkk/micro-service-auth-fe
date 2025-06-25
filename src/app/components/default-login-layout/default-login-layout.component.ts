import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-default-login-layout',
  standalone: true,
  imports: [],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss',
})
export class DefaultLoginLayoutComponent implements AfterViewInit {
  @Input() title = '';
  @Input() primaryBtnText = '';
  @Input() secondaryBtnText = '';
  @Input() disablePrimaryBtn = true;
  @Input() defaultImageLayout = '';
  @Input() showGoogleButton = false;

  @Output() onSubmit = new EventEmitter();
  @Output() onNavigate = new EventEmitter();
  @Output() onLoginWithGoogle = new EventEmitter<any>();

  @ViewChild('googleButtonDiv', { static: false })
  googleButtonDiv!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    if (this.showGoogleButton && this.googleButtonDiv) {
      google.accounts.id.initialize({
        client_id:
          '228679320984-6r1g4b8loha99vvqtrp4e7vcvrrpg2cd.apps.googleusercontent.com',
        callback: (response: any) => this.onLoginWithGoogle.emit(response),
      });

      google.accounts.id.renderButton(this.googleButtonDiv.nativeElement, {
        theme: 'outline',
        size: 'large',
        width: '100%',
      });
    }
  }

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }
}
