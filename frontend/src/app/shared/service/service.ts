import { HttpHeaders } from '@angular/common/http';

export function getHttpOption(options?: {}): any {
    return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'TOKEN',
            ...options,
        })
    };
}