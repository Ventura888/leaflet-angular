import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor() { }

  exportToCsv(data) {
    const fileName = 'USA-Capitals.csv';
    const columnNames = ['Name', 'State', 'Population', 'Capital Since', 'Coordinates', 'Area (mi²)'];
    const header = columnNames.join(',');

    let csv = header;
    csv += '\r\n';

    data.map(capital => {
      csv += [capital.properties.name, capital.properties.state, capital.properties.population, capital.properties.capitalSince, capital.geometry.coordinates.join('; '), capital.properties.area].join(',');
      csv += '\r\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
