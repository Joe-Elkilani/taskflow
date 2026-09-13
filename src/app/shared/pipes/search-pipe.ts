import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Search',
})
export class SearchPipe implements PipeTransform {
  transform(data: any[], text: string): any {
    if (!text) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase().includes(text.toLowerCase())),
    );
  }
}
