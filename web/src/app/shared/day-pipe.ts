import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'day'})
export class DayPipe  implements PipeTransform {
        transform(value: number): any {
                value = Number(value);
                if (!value) { return value;
                } else if (value === 1) {
                        return 'Domingo';
                } else if (value === 2) {
                        return 'Segunda-feira';
                } else if (value === 3) {
                        return 'Terça-feira';
                } else if (value === 4) {
                        return 'Quarta-feira';
                } else if (value === 5) {
                        return 'Quinta-feira';
                } else if (value === 6) {
                        return 'Sexta-feira';
                } else if (value === 7) {
                        return 'Sábado';
                }
        }
}
