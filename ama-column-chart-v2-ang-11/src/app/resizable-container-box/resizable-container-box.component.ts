import { Component, Input, EventEmitter, Output, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ContainerBoxOptions } from '../data-model/container-box-options';

/**
 * Статусы работы с контейнером
 */
const enum Status {
  /**
   * Без взаимодействия
   */
  OFF = 0,
  
  /**
   * Изменяется размер
   */
  RESIZE = 1
}

@Component({
  selector: 'resizable-container-box',
  templateUrl: './resizable-container-box.component.html',
  styleUrls: ['./resizable-container-box.component.less']
})
/**
 * Контейнер с изменяемым заполнением 
 */
export class ResizableContainerBoxComponent{
  /**
   * Настройки для создания контейнера
   */
  @Input() options: ContainerBoxOptions

  /**
   * Событие об удалении контейнера
   */
  @Output() removeEvent = new EventEmitter<any>();

  /**
   * Dom элемент контейнера
   */
  @ViewChild("containerBox") public containerBox: ElementRef;

  /**
   * Последняя записанная информация о курсоре
   */
  private mouse: {x: number, y: number}

  /**
   * Статус работы с контейнером
   */
  public status: Status = Status.OFF;

  //#region Public

  /**
   * Устанавливает статус работы с контейнером.
   * @param status Новый статус.
   */
   public setStatus(event: MouseEvent, status: number) {
    if (status === Status.RESIZE) {    
      event.stopPropagation();
    }

    this.status = status;
  } 

  /**
   * Срабатывает при нажатии на кнопку фиксации. 
   * @param event Событие клика мышкой
   */
   public lockUnlock(event:MouseEvent) {
    event.stopPropagation();

    this.options.lockUnlock();
  }

  
  /**
   * Срабатывает при нажатии на кнопку удаления. 
   * @param event Событие клика мышкой
   */
  public removeContainer(event:MouseEvent) {
    event.stopPropagation();

    this.removeEvent.emit(this.options.id);
  }

  //#endregion

  //#region Private

  /**
   * Срабатывает при передвижении мыши. 
   */
  @HostListener('window:mousemove', ['$event'])
  private onMouseMove(event: MouseEvent) {
    this.mouse = { x: event.clientX, y: event.clientY };

    if (this.status === Status.RESIZE && !this.options.lockStatus.isLocked) {
      this.resizeByMouseMove();
    }
  }

  /**
   * Обновляет высоту согласно перемещению мышки.
   */
  private resizeByMouseMove() {
    const newHeight = this.options.container.height + this.options.container.top - this.mouse.y + this.containerBox.nativeElement.getBoundingClientRect().y;

    this.options.setHeight(newHeight, true);
  }

  //#endregion
}
