// src/app/layout/layout.component.ts
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-layout',
  standalone:true,
  imports :[RouterModule,FormsModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('click', (e) => {
      const adminButton = document.getElementById('adminButton');
      const dropdown = document.getElementById('dropdownMenu');
      if (adminButton && dropdown && 
          !adminButton.contains(e.target as Node) && 
          !dropdown.contains(e.target as Node)) {
        dropdown.classList.add('hidden');
      }
    });
  }

  // Hàm để toggle menu theo id
  toggleMenu(id: string): void {
    const menu = document.getElementById(id);
    if (menu) {
      menu.classList.toggle('hidden');
    }
  }

  // Hàm để toggle dropdown của admin
  toggleDropdown(): void {
    const dropdown = document.getElementById('dropdownMenu');
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    }
  }
}
