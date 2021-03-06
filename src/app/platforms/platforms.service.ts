import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PlatformModel} from '../models/Platform.model';
import {HTTP_URL} from '../models/httpStatus';

@Injectable({
    providedIn: 'root'
})
export class PlatformsService {

    private platformList : PlatformModel[] = [];

    constructor(private http: HttpClient) {
    }

    public loadPlatforms() {
        if (!this.platformList[0]) {
            this.getDataPlatforms().subscribe(res => {
                    this.platformList = res;
                },
                (error: any) => {
                });
        }
    }

    public getPlatforms(){
        return this.platformList;
    }

    public getDataPlatforms(): Observable<PlatformModel[]> {
        return this.http.get<PlatformModel[]>(HTTP_URL + '/platform');
    }

    public createPlatform(platform: PlatformModel): Observable<PlatformModel> {
        console.log(platform);
        return this.http.post<PlatformModel>(HTTP_URL + '/platform', platform);
    }

    public updatePlatform(platform: PlatformModel): Observable<PlatformModel> {
        return this.http.put<PlatformModel>(HTTP_URL + '/platform', platform);
    }

    public deletePlatform(platform: PlatformModel): Observable<PlatformModel> {
        return this.http.post<PlatformModel>(HTTP_URL + '/platform/delete', platform);
    }

    public validateUrlImagePlatform(name: string) {
        let path = 'https://logo.clearbit.com/';
        let alternative = 'https://ui-avatars.com/api/?name=';
        this.http.head(path + name).subscribe(res => {
                return path + name + '.com';
            },
            (error: any) => {
                return alternative + name;
            }
        );
    }

    public getInfoPlatform (id_platform: number): Observable<any> {
        return this.http.post<any>(HTTP_URL + '/platform' + '/info', {id_platform});
    }
}
