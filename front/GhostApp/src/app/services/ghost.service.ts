import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GhostData } from '../ghost-game/model/ghost.model';
import { Observable } from 'rxjs';
import { CheckWordDto } from '../ghost-game/model/check-word-response.model';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class GhostService {

  formData: GhostData;
  readonly APIurl = 'https://localhost:44351/api/Ghost/checkWord';

  constructor(private http: HttpClient) {
   }

   checkWord(request: GhostData): Observable<any> {
    let checkWord: CheckWordDto = null;

    return this.http.post<CheckWordDto>(this.APIurl, request)
      .pipe(
        map(response => {
          checkWord = new CheckWordDto(response.winner, response.turn, response.word, response.round);
          return checkWord;
      }),
      catchError(this.handleError)
      );
    }

    handleError(error: any) {
      const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
    }

  }
