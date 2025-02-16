import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layoutstaff',
  standalone: true,
  imports: [HttpClientModule,FormsModule,RouterModule],
  templateUrl: './layoutstaff.component.html',
  styleUrl: './layoutstaff.component.css'
})
export class LayoutstaffComponent  implements OnInit {

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

  toggleMenu(id: string): void {
    const menu = document.getElementById(id);
    if (menu) {
      menu.classList.toggle('hidden');
    }
  }

  toggleDropdown(): void {
    const dropdown = document.getElementById('dropdownMenu');
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    }
  }
}
