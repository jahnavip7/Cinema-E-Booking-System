/*import { SafeUrlPipe } from './safeurl.pipe';

describe('SafeUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeUrlPipe();
    expect(pipe).toBeTruthy();
  });
}); */

import { SafeUrlPipe } from './safeUrl.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('SafeUrlPipe', () => {
  let sanitizer: DomSanitizer;
  let pipe: SafeUrlPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DomSanitizer, useValue: { bypassSecurityTrustResourceUrl: (url: string) => url } }
      ]
    });
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new SafeUrlPipe(sanitizer);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sanitize URLs', () => {
    const result = pipe.transform('https://example.com');
    expect(result).toBe('https://example.com');
  });
});
