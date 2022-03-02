import { utilService } from './util-service.js';
import { storageService } from './async-storage-service.js';

const STORAGE_KEY = 'carsDB';
_createCars();

export const carService = {
    query,
    remove,
    save,
    get,
    getEmptyCar,
};

function query() {
    return storageService.query(STORAGE_KEY);
}

function remove(carId) {
    return storageService.remove(STORAGE_KEY, carId);
}

function get(carId) {
    return storageService.get(STORAGE_KEY, carId)
    .then(car => {
        return _setNextPrevCarId(car)
    })
}

function save(car) {
    if (car.id) return storageService.put(STORAGE_KEY, car);
    else return storageService.post(STORAGE_KEY, car);
}

function _setNextPrevCarId(car) {
    return storageService.query(STORAGE_KEY).then(cars => {
        const carIdx = cars.findIndex(currCar => currCar.id === car.id)
        car.nextCarId = (cars[carIdx+1])? cars[carIdx+1].id : cars[0].id
        car.prevCarId = (cars[carIdx-1])? cars[carIdx-1].id : cars[cars.length-1].id
        return car
    })
}

// Factory Method:
function getEmptyCar(vendor = '', maxSpeed = 0) {
    return {
        id: '',
        vendor,
        maxSpeed,
        prevOwners: []
    };
}

function _createCars() {
    let cars = utilService.loadFromStorage(STORAGE_KEY);
    if (!cars || !cars.length) {
        cars = [];
        cars.push(_createCar('audu', 300));
        cars.push(_createCar('fiak', 120));
        cars.push(_createCar('subali', 100));
        cars.push(_createCar('mitsi', 150));
        utilService.saveToStorage(STORAGE_KEY, cars);
    }
    return cars;
}

function _createCar(vendor, maxSpeed = 250) {
    const car = getEmptyCar(vendor, maxSpeed)
    car.id = utilService.makeId()
    return car;
}



