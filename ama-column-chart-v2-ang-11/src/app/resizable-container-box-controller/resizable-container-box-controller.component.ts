import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ContainerBoxOptions } from '../data-model/container-box-options';

@Component({
  selector: 'resizable-container-box-controller',
  templateUrl: './resizable-container-box-controller.component.html',
  styleUrls: ['./resizable-container-box-controller.component.less']
})
/**
 * Контроллер для работы с множеством контейнеров
 */
export class ResizableContainerBoxControllerComponent {
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
  public containersStartCount: number = 3;

  /**
   * Конструктор контроллера.
   */
  constructor() {
    this.sampleContainerBoxOptions = new ContainerBoxOptions(
      {
        container: {
          left: 0, top: 0, height: 400, width: 200
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
    this.anyChanged();
  }

  /**
   * Удаляет контейнер по переданному Id
   * @param boxId Id удаляемого контейнера
   */
  onRemoveContainerEvent(boxId: string) {
    this.containerBoxOptions = this.containerBoxOptions.filter(function (item) {
      return boxId !== item.id;
    });

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
    let readyOptions = this.containerBoxOptions.filter(function(item) {
      if (item.lockStatus.isLocked) {
        return false;
      }

      let newPercent = item.fillPercent + delta / this.containerBoxOptions.length;
      return delta > 0 && newPercent <= 100 || delta < 0 && newPercent > 0;
    }, this);

    return readyOptions;
  }

  /**
   * Пересчитывает процент заполнения во всех контейнерах
   */
  anyChanged(): void {
    const delta = this.getChecksumDelta();

    let boxes = this.getContainerBoxOptionsReady(delta);

    if (boxes.length === 0) {
      return;
    }
   
    let singleContainerDelta = delta / boxes.length;
    if (singleContainerDelta !== 0) {
      boxes.forEach(function(item) {
        item.setBoxHeightByPercent(item.fillPercent + singleContainerDelta);
      }, this);
    }
  }
}
