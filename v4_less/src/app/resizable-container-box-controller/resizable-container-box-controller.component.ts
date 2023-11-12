import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ContainerBoxOptions } from '../data-model/container-box-options';
import { ROUTES } from '../app-routes';

@Component({
  selector: 'resizable-container-box-controller',
  templateUrl: './resizable-container-box-controller.component.html',
  styleUrls: ['./resizable-container-box-controller.component.less']
})
/**
 * Контроллер для работы с множеством контейнеров
 */
export class ResizableContainerBoxControllerComponent {

  public ROUTES = ROUTES;

  /**
   * Базовый экземпляр настроек для копирования.
   */
  public sampleContainerBoxOptions: ContainerBoxOptions;

  /**
   * Набор настроек существующих контейнеров.
   */
  public containerBoxOptions: ContainerBoxOptions[];

  /**
   * Настройки контейнера используемого для добавления элементов.
   */
  public addBoxOptions: ContainerBoxOptions;

  /**
   * Изначальное количество контейнеров.
   */
  public containersStartCount: number = 2;

  /**
   * Видно ли область для добавления столбиков.
   */
  public isAddBoxShown: boolean = true;

  /**
   * Максимальное количетсво столбиков.
   */
  public containerMaxCount: number = 3;

  /**
   * Текущее количеств столбиков.
   */
  private _containerCount: number = this.containersStartCount;

  /**
   * Конструктор контроллера.
   */
  constructor() {
    this.sampleContainerBoxOptions = new ContainerBoxOptions(
      {
        container: {
          left: 0, top: -10, height: 400, width: 200
        },
        box: {
          height: 133
        }
      }
    );

    this.addBoxOptions = this.sampleContainerBoxOptions.clone();

    this.containerBoxOptions = [];

    for (let i = 0; i < this.containersStartCount; i++) {
      this.addSampleContainerBox();
    }

    this.recalculateAllBoxesPercent();
  }

  /**
   * Добавляет контейнер на основании базового.
   * @returns Id добавленного контейнера
   */
  addSampleContainerBox(): string {
    let scope = this;   

    let clone = this.sampleContainerBoxOptions.clone();     

    clone.fillChangedObservable.subscribe({
      next(boxId) {
        scope.anyChanged();
      }}
    );

    this.containerBoxOptions.push(clone);

    return clone.id;
  }

  /**
   * Срабатывает при нажатии на Добавление контейнера.
   */
  onAddClick() {
    this.addSampleContainerBox();
    console.log("Added container! New count: " + this._containerCount);

    this.anyChanged();

    this._containerCount++;
    if (this._containerCount >= this.containerMaxCount)
    {
      this.isAddBoxShown = false;
      return;
    }
  }

  /**
   * Удаляет контейнер по переданному Id
   * @param boxId Id удаляемого контейнера
   */
  onRemoveContainerEvent(boxId: string) {
    this._containerCount--;
    if (this._containerCount < this.containerMaxCount)
    {
      this.isAddBoxShown = true;
    }

    this.containerBoxOptions = this.containerBoxOptions.filter(function (item) {
      return boxId !== item.id;
    });
    console.log("Remoed container! New count: " +  + this._containerCount);
    
    this.anyChanged();
  }

  /**
   * Возвращает отклонение суммы процентов заполнения контейнров от 100
   * @returns Отклонение суммы процентов заполнения контейнров от 100
   */
  getChecksumDelta(): number {
    let sumFillPercent = 0;

    this.containerBoxOptions.forEach(function(item) {
      sumFillPercent += item.fillPercent;
    }, this);

    return 100 - sumFillPercent;
  }

  /**
   * Возвращает список контейнеров готовых к равномерному изменению на часть дельты.
   * @param delta Отклонение суммы процентов заполнения контейнров от 100
   * @returns Список контейнеров готовых к равномерному изменению на часть дельты.
   */
  getContainerBoxOptionsReady(delta: number): ContainerBoxOptions[] {
    let readyOptions = this.containerBoxOptions.filter((item) => {
      if (item.lockStatus.isLocked) {
        return false;
      }

      let newPercent = item.fillPercent + delta / this.containerBoxOptions.length;
      return delta > 0 && newPercent <= 100 || delta < 0 && newPercent > 0;
    });

    return readyOptions;
  }

  /**
   * Пересчитывает процент заполнения во всех контейнерах
   */
  anyChanged(): void {
    this.recalculateAllBoxesPercent();
  }
  
  recalculateAllBoxesPercent(): void {
    const delta = this.getChecksumDelta();

    let boxes = this.getContainerBoxOptionsReady(delta);

    if (boxes.length === 0) {
      return;
    }

    // Если больше одной коробки, то их можно удалять
    const isRemoveButtonShown = this.containerBoxOptions.length !== 1; 
   
    let singleContainerDelta = delta / boxes.length;
    if (singleContainerDelta !== 0) {
      boxes.forEach(function(item) {
        item.setHeightByPercent(item.fillPercent + singleContainerDelta);
        item.setIsRemoveButtonShown(isRemoveButtonShown);
      }, this);
    }
  }
}
