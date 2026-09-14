import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Search',
})
export class SearchPipe implements PipeTransform {
  transform(data: any[], text: string): any[] {
    if (!data) return [];
    if (!text) return data;

    const query = text.toLowerCase();

    return data.filter((item) => {
      const searchable = item?.name ?? item?.taskName ?? '';
      return searchable.toLowerCase().includes(query);
    });
  }
}
