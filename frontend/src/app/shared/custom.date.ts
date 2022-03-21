import { Pipe, PipeTransform } from '@angular/core';
import { format, formatDistance } from 'date-fns';
import en from "date-fns/locale/en-US"

@Pipe({
  name: 'dateFormat'
})
export class FormatDatePipe implements PipeTransform {
  transform(value: any): string {
    return formatDistance(new Date(), new Date(value), { locale: en });
  }
}