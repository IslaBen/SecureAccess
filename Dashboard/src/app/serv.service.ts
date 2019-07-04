import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Room} from './Room';
import {User} from './User';
import {accessLog} from './accessLog';

@Injectable({
    providedIn: 'root'
})
export class ServService {

    constructor(private http :HttpClient) { }

    getUsers() : Observable<User[]> {
        return this.http.get<User[]>('http://localhost:3000/persons');
    }

    delUser(id) {
        return this.http.delete<any>(`http://localhost:3000/...${id}`);
    }

    addUser(user) {
        return this.http.post<User>(`http://localhost:3000/persons`, user);
    }

    getRooms() :Observable<Room[]> {
        return this.http.get<Room[]>('http://localhost:3000/rooms');
    }

    delRoom(id) :Observable<any>{
        return this.http.delete<any>(`http://localhost:3000/rooms/${id}`);
    }

    addRoom(room):Observable<Room> {
        return this.http.post<Room>(`http://localhost:3000/rooms`, room);
    }

    updateRoom(id: string, state: boolean) :Observable<any>{
        return this.http.patch<any>(`http://localhost:3000/rooms/${id}`, {state : !state});
    }

    getLogs() :Observable<accessLog[]> {
        return this.http.get<accessLog[]>('http://localhost:3000/logs');
    }

    getPerson(id) : Observable<User> {
        return this.http.get<User>(`http://localhost:3000/persons/${id}`);
    }
    getRoom(id) :Observable<Room> {
        return this.http.get<Room>(`http://localhost:3000/rooms/${id}`);
    }

    delAccessLog(id) :Observable<any>{
        return this.http.delete<any>(`http://localhost:3000/logs/${id}`);
    }
}
