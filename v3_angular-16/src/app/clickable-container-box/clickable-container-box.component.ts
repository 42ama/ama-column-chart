import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { ContainerBoxOptions } from '../data-model/container-box-options';

@Component({
  selector: 'clickable-container-box',
  templateUrl: './clickable-container-box.component.html',
  styleUrls: ['./clickable-container-box.component.less']
})

/**
 * Контейнер на который можно кликать.
 */
export class ClickableContainerBoxComponent {
  /**
   * Настройки контейнера
   */
  @Input() options: ContainerBoxOptions

  /**
   * Событие клика на контейнер
   */
  @Output() onClickEvent = new EventEmitter();

  /**
   * Срабатывает при клике на контейнер.
   * @param event Событие клика мышкой
   */
  onClick(event: MouseEvent) {
    event.stopPropagation();
    
    this.onClickEvent.emit();
  } 
}
