// tslint:disable: no-string-literal
import { FileReaderService } from './file-reader.service';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { IEmployee } from './../../interfaces/employee';

const mockData = [
  {
    'Date of birth': '1978-01-02T00:00:00',
    'First name': 'Theo',
    'Issue count': '5',
    'Sur name': 'Jansen',
  },
  {
    'Date of birth': '1950-11-12T00:00:00',
    'First name': 'Fiona',
    'Issue count': '7',
    'Sur name': 'de Vries',
  },
];

const hadledMockData = [
  {
    dateOfBirth: '1978-01-02',
    firstname: 'Theo',
    issueCount: '5',
    surname: 'Jansen',
  },
  {
    dateOfBirth: '1950-11-12',
    firstname: 'Fiona',
    issueCount: '7',
    surname: 'de Vries',
  },
];

describe('Service: FileReaderService', () => {
  let service: FileReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileReaderService],
    });

    service = TestBed.inject(FileReaderService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should parse file', () => {
    service.parseFile(new File(['content'], 'file.csv'));
    service['parsedEmployeesData'].subscribe((res) => {
      if (res) {
        expect(res).toBeTruthy();
      }
    });
  });

  it('should handle employees data', () => {
    const handledData = service['employeesDataHandler'](mockData);
    expect(handledData).toEqual(hadledMockData);
  });

  it('should transform Date', () => {
    const transformedDate = service['transformDate']('1978-01-02T00:00:00');
    expect(transformedDate).toEqual('1978-01-02');
  });

  it('should filter Employees by issue count', () => {
    service['parsedEmployeesData'].next(hadledMockData);

    service.filterEmployeesByIssueCount('5');

    service.employeesData.subscribe((res) =>
      expect(res).toEqual([hadledMockData[0]])
    );
  });

  it('should init filteredEmployeesData like parsedEmployeesData ', () => {
    service['parsedEmployeesData'].next(hadledMockData);

    service.filterEmployeesByIssueCount('');

    service.employeesData.subscribe((res) =>
      expect(res).toEqual(hadledMockData)
    );
  });
});
