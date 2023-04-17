export class Weather{
    time!: string;
    temperature!: number;
    weatherCode!: number;
    windSpeed!: number;
    windDirection!: number;
    humidity!: number;
    uvIndex!: number;
    visibility!: number;
    precipitationProbability!: number;
    temperatureApparent!: number;
    name!: string;
    icon: string = `assets/icons/${this.weatherCode}.png`;
}