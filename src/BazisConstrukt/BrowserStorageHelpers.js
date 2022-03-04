

/**
 * Базовый класс для всех хранилищ
 * @description Не забываем в скомпиленом файле в 6 строчке поменять на b.prototype.hasOwnProperty.call(p)
 */
class BasePropertiesStorage {
    // Ключ для уникальных создания уникального имени в хранилище
    _key = null;
    // Ключ для уникальной записи с типами значений
    _keyTypeItem = null;
    // Префикс для записи в хранилище с типами значений
    _keyTypePrefix = 'TypesItem';

    constructor(prefix) {
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
    _buildKey(key) {
        return this._key + key;
    }

    /**
     * Добавления типа переменной в хранилище типов
     *
     * @param key Ключ
     * @param type Тип переменной
     * @private
     */
    _setTypeItem(key, type) {
        const currentTypeItem= this._getCurrentTypeItem();
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
    _getTypeItem(key) {
        const currentTypeItem= this._getCurrentTypeItem();

        return currentTypeItem[key] || null;
    }

    /**
     * Удаление типа из хранилища типов
     *
     * @param key Ключ
     * @private
     */
    _removeTypeItem(key) {
        const currentTypeItem= this._getCurrentTypeItem();

        const newTypeItem= {};

        Object.keys(currentTypeItem).forEach((keyItem) => {
            if (keyItem !== key) {
                newTypeItem[keyItem] = currentTypeItem[keyItem];
            }
        });

        this._setTypeItemInStorage(this._keyTypeItem, JSON.stringify(currentTypeItem));
    }

    static _prepareTypeResult(value, key, typeItems){
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

    static _prepareValue(value) {
        return typeof value === 'object' ? JSON.stringify(value) : value;
    }

    /**
     * Получение текущей записи о типах переменной
     *
     * @return Запись о текущих типах переменных
     * @private
     */
    //_getCurrentTypeItem(){}

    /**
     * Установка записи о текущих типах значений переменных в хранилище
     *
     * @param key Ключ записи типов значения
     * @param value Запись о типах значений
     * @private
     */
    //_setTypeItemInStorage(key, value){}
    
}


/**
 * Класс для работы с локальным хранилищем
 *
 * @author Старков Е.П.
 * @extends BasePropertiesStorage
 */
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
    set(key, value, force = false) {
        if (!force) {
            this._setTypeItem(key, typeof value);
        }

        const cookieValue = this._createCookiesString(key, BasePropertiesStorage._prepareValue(value), force);

        if (cookieValue.length < this._maxLength) {
            document.cookie = cookieValue;
        } else {
            alert("Ошибка!!")
        }
    }

    /**
     * Получение значения по ключу
     *
     * @param key Ключ в куках
     * @return Значение по ключу или null - если не найдено
     */
    get(key) {
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
    delete(key) {
        document.cookie = encodeURIComponent(this._buildKey(key)) + '=; max-age=-1';
    }

    /**
     * Очистка всех значений в куках
     */
    clear() {
        const allCookies = document.cookie.split(';');
        allCookies.forEach((cookie) => {
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
    changePath(newPath) {
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
    changeDomain(newDomain) {
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
    changeExpires(newExpires) {
        this._expires = newExpires.toUTCString();
    }

    /**
     * Изменения срока окончания кук
     *
     * @param newMaxAgeSeconds Новый срок окончания кук
     * (параметр передается в секундах)
     * @default 1 день
     */
    changeMaxAge(newMaxAgeSeconds) {
        this._maxAge = newMaxAgeSeconds;
    }

    /**
     * Защищенные куки или нет
     *
     * @param newSecure Новый признак защищенности
     */
    changeSecure(newSecure) {
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
    _createCookiesString(key, value, force = false) {

        let cookieValue = encodeURIComponent(
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
    _getCurrentTypeItem(){
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
    _setTypeItemInStorage(key, value) {
        this.set(key, value, true);
    }

    _getCookieValue(key, force = false) {
        const allCookies = document.cookie.split(';');
        let matches = null;
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

export {CookieStorage}