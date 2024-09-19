import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  images = [
    { src: 'assets/default.jpg', state: 'default' },
    { src: 'assets/default.jpg', state: 'default' },
    { src: 'assets/default.jpg', state: 'default' },
    { src: 'assets/default.jpg', state: 'default' },
    { src: 'assets/default.jpg', state: 'default' },
    { src: 'assets/default.jpg', state: 'default' },
    { src: 'assets/default.jpg', state: 'default' },
    { src: 'assets/default.jpg', state: 'default' },
    { src: 'assets/default.jpg', state: 'default' }
  ];

    // The full set of images from which to randomly pick
    fullImageArray = [
      { src: 'assets/default.jpg' },
      { src: 'assets/default.jpg' },
      { src: 'assets/default.jpg' },
      { src: 'assets/default.jpg' },
      { src: 'assets/default.jpg' },
      { src: 'assets/default.jpg' },
      // Add as many images as you like here
    ];
 

  currentImageIndex = 0;
  transitioning = false;

  getRandomIndex(currentIndex: number, arrayLength: number): number {
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * arrayLength);
    } while (randomIndex === currentIndex);
    return randomIndex;
  }

  ngOnInit() {
    this.startImageRotation();
  }


  startImageRotation() {
    setInterval(() => {
      if (!this.transitioning) {
        this.transitioning = true;

        // Transition out the current image
        setTimeout(() => {
          // Generate a new random index and select a new image from fullImageArray
          const newImage = this.getRandomImage();

          // Update the current image's source in the visible grid
          this.images[this.currentImageIndex].src = newImage.src;

          // Pick a new random index for the next transition
          let newIndex: number;
          do {
            newIndex = Math.floor(Math.random() * this.images.length);
          } while (newIndex === this.currentImageIndex);

          this.currentImageIndex = newIndex;
          this.transitioning = false;
        }, 1000); // Duration of the pop-out animation
      }
    }, 4000); // Change image every 4 seconds (1s pop-out + 3s pause)
  }

  // Function to get a random image from the fullImageArray
  getRandomImage() {
    const randomIndex = Math.floor(Math.random() * this.fullImageArray.length);
    return this.fullImageArray[randomIndex];
  }

  // Return the correct animation class based on the current index
  getImageClass(index: number) {
    if (index === this.currentImageIndex) {
      return this.transitioning ? 'pop-out' : 'pop-in';
    }
    return 'pop-in';
  }
}
