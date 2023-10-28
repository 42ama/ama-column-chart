import { Observable, Observer } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

/**
 * Модель логики контейнра.
 */
export class ContainerBoxOptions {
    /**
     * Геометрические параметры контейнера.
     */
    container: {left: number, top: number, height: number, width: number};

    /**
     * Геометрические параметры внутренней коробки.
     */
    box: {height: number};

    /**
     * Id контейнера.
     */
    id: string;
    
    /**
     * Процент заполнения контейнера коробкой.
     */
    fillPercent: number;

    /**
     * Границы заполнения контейнера коробкой.
     */
    fillBound: {upper: number, lower: number};

    /**
     * Зафиксированно ли изменения заполнения контейнера коробкой.
     */
    lockStatus: {text: string, isLocked: boolean};


    /**
     * Observable контролирующий наблюдение за процентом заполнения.
     */
    fillChangedObservable: Observable<string>;

    /**
     * Observer наблюдающий за процентом заполнения.
     */
    fillChangedObserver: Observer<string>;
  
    
    /**
     * Конструктор контейнера.
     * @param data {Object} Геометрические параметры контейнера и коробки.
     */
    constructor(data: { container: any; box: any; }) {
      this.container = data.container;
      this.box = data.box;

      this.id = uuidv4();

      this.fillBound = {
        upper: 100,
        lower:0
      };
  
      this.lockStatus = {
        text: "Lock",
        isLocked: false
      };
      
      this.fillChangedObservable = new Observable(observer =>
        this.fillChangedObserver = observer);     

      this.recalculateFillPercent();    
    }

  /**
   * Устанавливает высотку коробки по переданному проценту заполнения.
   * @param {number} percent Процент заполнения контейнера.
   */
  public setBoxHeightByPercent(percent: number, recalculateAll: boolean = false) {
    percent = Math.round(percent);
    
    let newHeigth: number;
    if (percent >= this.fillBound.upper) {
      percent = this.fillBound.upper;
      newHeigth = this.container.height;
    } else if (percent <= this.fillBound.lower) {
      percent = this.fillBound.lower;
      newHeigth = 0;
    } else {
      newHeigth = this.container.height * percent / 100;
    }

    this.setHeight(newHeigth, recalculateAll);

    this.fillPercent = percent;
  }

  /**
   * Пересчитывает процент заполнения контейнера коробкой.
   */
  public recalculateFillPercent() {
    this.fillPercent = Math.round(this.box.height * 100 / this.container.height);
  }

  /**
   * Устанавливает новую валидную высоту коробки.
   * @param newHeigth Новая высота коробки.
   */
  public setHeight(newHeigth: number, recalculateAll: boolean = false) {
    if (newHeigth >= this.container.height) {
      newHeigth = this.container.height;
    } else if (newHeigth <= 0) {
      newHeigth = 0;
    }

    this.box.height = newHeigth;

    this.recalculateFillPercent();

    if (recalculateAll) {
      this.fillChangedObserver.next(this.id);
    }    
  }

  /**
   * Меняет статус зафиксированности контейнера на противоположный.
   */
  public lockUnlock() {
    this.lockStatus.isLocked = !this.lockStatus.isLocked;

    this.lockStatus.text = this.lockStatus.isLocked
      ? "Unlock"
      : "Lock";
  }

  /**
   * Создает клон текщуего контейнера.
   * @returns Клон текущего контейнера.
   */
  public clone(): ContainerBoxOptions {
    return new ContainerBoxOptions(
      {
        container: {
          left: this.container.left,
          top: this.container.top,
          height: this.container.height,
          width: this.container.width
        }, 
        box: {
          height: this.box.height
        }
      }
    );
  }
}