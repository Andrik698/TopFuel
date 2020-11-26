import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'shortText'
})
export class ShortTextPipe implements PipeTransform{
  transform(value: string): string {
    if (value.length > 50) {
      return value.substring(0,50)
    }
    return
  }
}
