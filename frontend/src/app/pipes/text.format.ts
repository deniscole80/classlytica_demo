import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'formatText'
})

/**
 * Accepts string with underscore and covert it to proper string
 * @Params (string)
 * @Return (string) 
 */

export class TextChange implements PipeTransform {
    transform( text: string){
        return text.replace('_', ' ')
    }
}