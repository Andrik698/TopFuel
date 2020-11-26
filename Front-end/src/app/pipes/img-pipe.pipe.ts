import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'imgSlice'
})
export class ImgPipePipe implements PipeTransform{
  transform(value: string): string {
    return value.slice(13, value.length-6)
  }
}
