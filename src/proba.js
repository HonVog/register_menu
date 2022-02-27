

class CookieStorage extends BasePropertiesStorage {
     _path = '/';
    _domain;
    _expires;
    _maxAge = 24 * 60 * 60;
    _isSecure = true;
    // максимальная длинна записи в cookie
    _maxLength = 4 * 1024 - 10;

    constructor(prefix) {
        super(prefix);
    }

    /**
     * Установка значений в куки
     *
     * @param key Ключ для значения в куках
     * @param value Значение
     * @param force Принудительная установка (пропуск установки типа)
     */
    set(key, value, force = false){
        if (!force) {
            this._setTypeItem(key, typeof value);
        }

        const cookieValue = this._createCookiesString(key, BasePropertiesStorage._prepareValue(value), force);

        if (cookieValue.length < this._maxLength) {
            document.cookie = cookieValue;
        } else {
            new Exception(ExceptionType.ERROR, 'CookieStorage',
                'Длинна записи в куки - ' + cookieValue.length +
                '. Максимальная длинна - ' + this._maxLength);
        }
    }

    /**
     * Получение значения по ключу
     *
     * @param key Ключ в куках
     * @return Значение по ключу или null - если не найдено
     */
    get(key: string): any {
        const matches = this._getCookieValue(key);

        return matches
            ? BasePropertiesStorage._prepareTypeResult(decodeURIComponent(matches), key, this._getTypeItem(key))
            : matches;
    }

    /**
     * Удаление значения в куках по ключу
     *
     * @param key Ключ удаляемого значения
     */
    delete(key: string): void {
        document.cookie = encodeURIComponent(this._buildKey(key)) + '=; max-age=-1';
    }

    /**
     * Очистка всех значений в куках
     */
    clear(): void {
        const allCookies: string[] = document.cookie.split(';');
        allCookies.forEach((cookie: string) => {
            const cookieName = cookie.indexOf('=') ? cookie.split('=')[0] : null;
            if (cookieName) {
                this.delete(cookieName);
            }
        });
    }

    /**
     * Изменение пути для кук
     *
     * @param newPath Новый путь
     * @default '/'
     */
    changePath(newPath: string): void {
        this._path = newPath;
    }

    /**
     * Изменение значения ддомена в куках
     *
     * @param newDomain Новый домен
     * (!Не забывать, что если указать поддомен,
     * куки не доступны для основного домена.
     * Лучше использовать всегда основной домен)
     * @default Текущий домен
     */
    changeDomain(newDomain: string): void {
        this._domain = newDomain;
    }

    /**
     * Изменение даты окончания куков
     *
     * @param newExpires Новая дата окончания
     * @default Не установлен
     * @description Если установить данный параметр,
     * то в куки не добавляется max-age
     */
    changeExpires(newExpires: Date): void {
        this._expires = newExpires.toUTCString();
    }

    /**
     * Изменения срока окончания кук
     *
     * @param newMaxAgeSeconds Новый срок окончания кук
     * (параметр передается в секундах)
     * @default 1 день
     */
    changeMaxAge(newMaxAgeSeconds: number): void {
        this._maxAge = newMaxAgeSeconds;
    }

    /**
     * Защищенные куки или нет
     *
     * @param newSecure Новый признак защищенности
     */
    changeSecure(newSecure: boolean): void {
        this._isSecure = newSecure;
    }

    /**
     * Создание строки кук для добавления
     * Размер итоговой куки не может быть больше свойства _maxLength
     *
     * @param key Ключ для кук
     * @param value Значение
     * @param force Принудительная установка (ключ не преобразовывается)
     * @private
     */
    protected _createCookiesString(key: string, value: string, force: boolean = false): string {

        let cookieValue: string = encodeURIComponent(
            (!force ? this._buildKey(key) : key)).trim() + '=' + encodeURIComponent(value)
            + '; path=' + this._path;

        if (this._domain) {
            cookieValue += '; domain=' + this._domain;
        }

        if (this._expires) {
            cookieValue += '; expires=' + this._expires;
        } else {
            cookieValue += '; max-age=' + this._maxAge;
        }

        if (this._isSecure) {
            cookieValue += '; secure';
        }

        return cookieValue;
    }

    /**
     * Получение текущей записи о типах переменной
     *
     * @return Запись о текущих типах переменных
     * @private
     */
    protected _getCurrentTypeItem(): {[key: string]: string} {
        const typeItem = this._getCookieValue(this._keyTypeItem, true);
        return typeItem ? JSON.parse(decodeURIComponent(typeItem)) : {};
    }

    /**
     * Установка записи о текущих типах значений переменных в хранилище
     *
     * @param key Ключ записи типов значения
     * @param value Запись о типах значений
     * @private
     */
    protected _setTypeItemInStorage(key: string, value: string): void {
        this.set(key, value, true);
    }

    protected _getCookieValue(key: string, force: boolean = false): string {
        const allCookies: string[] = document.cookie.split(';');
        let matches: string = null;
        allCookies.forEach((cookie) => {
            if (cookie) {
                const cookiePart = cookie.split('=');

                if (cookiePart[0].trim() === (!force ? this._buildKey(key) : key) && !matches) {
                    matches = cookiePart[1];
                }
            }
        });

        return matches;
    }
}
