// tslint:disable: no-string-literal
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HttpClientService } from './http-client.service';

interface Data {
  name: string;
}
const testUrl = 'data';

describe('Service: HttpClient', () => {
  let service: HttpClientService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClientService],
    });
    service = TestBed.inject(HttpClientService);
    httpTestingController = TestBed.inject(HttpTestingController);

    service['apiUrl'] = 'http://fake/api';
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should make Http GET request ', () => {
    const testData: Data = { name: 'Test Data' };

    service
      .get<Data>(testUrl)
      .subscribe((data) => expect(data).toEqual(testData));

    const req = httpTestingController.expectOne(
      `${service['apiUrl']}/${testUrl}`
    );

    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

  it('should make Http POST request ', () => {
    const testData: Data = { name: 'Test Data' };

    service
      .post<Data>(testUrl, testData)
      .subscribe((data) => expect(data).toEqual(testData));

    const req = httpTestingController.expectOne(
      `${service['apiUrl']}/${testUrl}`
    );

    expect(req.request.method).toEqual('POST');

    req.flush(testData);
  });

  it('should handle errors', () => {
    const emsg = 'deliberate 404 error';

    service.get<Data[]>(testUrl).subscribe(
      (data) => fail('should have failed'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne(
      `${service['apiUrl']}/${testUrl}`
    );

    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  it('should handle network errors', () => {
    const emsg = 'simulated network error';
    service.get<Data>(testUrl).subscribe(
      (data) => fail('should have failed'),
      (error: HttpErrorResponse) => {
        expect(error.error.message).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne(
      `${service['apiUrl']}/${testUrl}`
    );

    const mockError = new ErrorEvent('Network error', {
      message: emsg,
    });

    req.error(mockError);
  });
});
