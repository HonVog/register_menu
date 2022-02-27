

/**
 * Базовый класс для всех хранилищ
 * @description Не забываем в скомпиленом файле в 6 строчке поменять на b.prototype.hasOwnProperty.call(p)
 */
 abstract class BasePropertiesStorage {
    // Ключ для уникальных создания уникального имени в хранилище
    protected _key = null;
    // Ключ для уникальной записи с типами значений
    protected _keyTypeItem = null;
    // Префикс для записи в хранилище с типами значений
    protected readonly _keyTypePrefix = 'TypesItem';

    constructor(prefix: string) {
        this._key = prefix;
        this._keyTypeItem = this._key + this._keyTypePrefix;
    }

    /**
     * Построение уникального имени для сесии
     *
     * @param key Ключ значения
     * @private
     * @return Уникальный ключ для сессии
     */
    protected _buildKey(key: string): string {
        return this._key + key;
    }

    /**
     * Добавления типа переменной в хранилище типов
     *
     * @param key Ключ
     * @param type Тип переменной
     * @private
     */
    protected _setTypeItem(key: string, type: string): void {
        const currentTypeItem: { [key: string]: string } = this._getCurrentTypeItem();
        currentTypeItem[key] = type;
        this._setTypeItemInStorage(this._keyTypeItem, JSON.stringify(currentTypeItem));
    }

    /**
     * Получение типа значения в хранилище
     *
     * @param key
     * @private
     * @return Тип значения из хранилища
     */
    protected _getTypeItem(key: string): string {
        const currentTypeItem: { [key: string]: string } = this._getCurrentTypeItem();

        return currentTypeItem[key] || null;
    }

    /**
     * Удаление типа из хранилища типов
     *
     * @param key Ключ
     * @private
     */
    protected _removeTypeItem(key: string): void {
        const currentTypeItem: { [key: string]: string } = this._getCurrentTypeItem();

        const newTypeItem: { [key: string]: string } = {};

        Object.keys(currentTypeItem).forEach((keyItem: string) => {
            if (keyItem !== key) {
                newTypeItem[keyItem] = currentTypeItem[keyItem];
            }
        });

        this._setTypeItemInStorage(this._keyTypeItem, JSON.stringify(currentTypeItem));
    }

    protected static _prepareTypeResult(value: any, key: string, typeItems: string): any {
        if (typeof value === 'string') {
            switch (typeItems) {
                case 'number':
                    return Number(value);
                case 'object':
                    return JSON.parse(value);
                default:
                    return value;
            }
        }

        return value;
    }

    protected static _prepareValue(value: any): any {
        return typeof value === 'object' ? JSON.stringify(value) : value;
    }

    /**
     * Получение текущей записи о типах переменной
     *
     * @return Запись о текущих типах переменных
     * @private
     */
    protected abstract _getCurrentTypeItem(): {[key: string]: string};

    /**
     * Установка записи о текущих типах значений переменных в хранилище
     *
     * @param key Ключ записи типов значения
     * @param value Запись о типах значений
     * @private
     */
    protected abstract _setTypeItemInStorage(key: string, value: string): void;
}

/**
 * Базовый класс для хранилищ DOM
 *
 * @extends BasePropertiesStorage
 * @author Старков Е.П.
 */
class BaseStorage extends BasePropertiesStorage {
    // Хранилище значений
    protected _storage: Storage;

    /**
     * Установка значений в хранилище
     *
     * @param key Ключ значения
     * @param value Значение
     */
    set(key: string, value: any): void {
        this._setTypeItem(key, typeof value);

        this._storage.setItem(this._buildKey(key), BasePropertiesStorage._prepareValue(value));
    }

    /**
     * Получение значения из хранилища по ключу
     *
     * @param key Ключ значения
     * @description Возвращает значение или null при отсутствии
     * @return Значение из сессии по ключу
     */
    get(key: string): any {
        return BasePropertiesStorage._prepareTypeResult(
            this._storage.getItem(this._buildKey(key)), key,
            this._getTypeItem(key)
        );
    }

    /**
     * Удаление значения по ключу
     *
     * @param key Ключ
     */
    delete(key: string): void {
        this._storage.removeItem(key);
        this._removeTypeItem(key);
    }

    /**
     * Удаление всех значений в хранилище
     */
    clear(): void {
        this._storage.clear();
    }

    /**
     * Получение текущей записи о типах переменной
     *
     * @return Запись о текущих типах переменных
     * @private
     */
    protected _getCurrentTypeItem(): {[key: string]: string} {
        return JSON.parse(this._storage.getItem(this._keyTypeItem)) || {};
    }

    /**
     * Установка записи о текущих типах значений переменных в хранилище
     *
     * @param key Ключ записи типов значения
     * @param value Запись о типах значений
     * @private
     */
    protected _setTypeItemInStorage(key: string, value: string): void {
        this._storage.setItem(key, value);
    }
}

/**
 * Класс для работы с сессиями
 *
 * @author Старков Е.П.
 * @extends BaseStorage
 */
class SessionStorage extends BaseStorage {
    protected _storage: Storage = sessionStorage;
}

/**
 * Класс для работы с локальным хранилищем
 *
 * @author Старков Е.П.
 * @extends BaseStorage
 */
class LocalStorage extends BaseStorage {
    protected _storage: Storage = localStorage;
}

/**
 * Класс для работы с локальным хранилищем
 *
 * @author Старков Е.П.
 * @extends BasePropertiesStorage
 */
class CookieStorage extends BasePropertiesStorage {
    protected _path: string = '/';
    protected _domain: string;
    protected _expires: string;
    protected _maxAge: number = 24 * 60 * 60;
    protected _isSecure: boolean = true;
    // максимальная длинна записи в cookie
    protected readonly _maxLength: number = 4 * 1024 - 10;

    constructor(prefix: string) {
        super(prefix);
    }

    /**
     * Установка значений в куки
     *
     * @param key Ключ для значения в куках
     * @param value Значение
     * @param force Принудительная установка (пропуск установки типа)
     */
    set(key: string, value: any, force: boolean = false): void {
        if (!force) {
            this._setTypeItem(key, typeof value);
        }

        const cookieValue: string = this._createCookiesString(key, BasePropertiesStorage._prepareValue(value), force);

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

export {SessionStorage, LocalStorage, CookieStorage}