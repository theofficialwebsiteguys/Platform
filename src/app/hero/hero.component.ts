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
  videos = [
    { src: 'assets/hero-clips/amores-hero-clip.mp4', state: 'default' },
    { src: 'assets/hero-clips/andy-hero-clip.mp4', state: 'default' },
    { src: 'assets/hero-clips/cakes-hero-clip.mp4', state: 'default' },
    { src: 'assets/hero-clips/jeremy-hero-clip.mp4', state: 'default' },
    { src: 'assets/hero-clips/luke-hero-clip.mp4', state: 'default' },
    { src: 'assets/hero-clips/oliver-hero-clip.mp4', state: 'default' },
    { src: 'assets/hero-clips/riverside-hero-clip.mp4', state: 'default' },
    { src: 'assets/hero-clips/riverside-hero-clip.mp4', state: 'default' },
    { src: 'assets/default.jpg', state: 'default' }
  ];

  largeVideo = { src: 'assets/hero-clips/hero-video.mp4' }; 

  websiteClips = [ 
    { src: 'assets/hero-clips/amores-hero-clip.mp4' },
  ]

  fullVideoArray = [
    { src: 'assets/hero-clips/amores-hero-clip.mp4' },
    { src: 'assets/hero-clips/andy-hero-clip.mp4'},
    { src: 'assets/hero-clips/cakes-hero-clip.mp4'},
    { src: 'assets/hero-clips/jeremy-hero-clip.mp4'},
    { src: 'assets/hero-clips/luke-hero-clip.mp4'},
    { src: 'assets/hero-clips/oliver-hero-clip.mp4'},
    { src: 'assets/hero-clips/riverside-hero-clip.mp4'},
  ];

  currentVideoIndex = 0;
  transitioning = false;

  ngOnInit() {
    this.startVideoRotation();
  }

  startVideoRotation() {
    setInterval(() => {
      if (!this.transitioning) {
        this.transitioning = true;

        // Start pop-out animation
        this.videos[this.currentVideoIndex].state = 'pop-out';

        setTimeout(() => {
          // Generate a new random index and select a new video from fullVideoArray
          const newVideo = this.getRandomVideo();

          // Update the current video's source in the visible grid
          this.videos[this.currentVideoIndex].src = newVideo.src;
          this.videos[this.currentVideoIndex].state = 'pop-in';

          // Pick a new random index for the next transition
          let newIndex: number;
          do {
            newIndex = Math.floor(Math.random() * this.videos.length);
          } while (newIndex === this.currentVideoIndex);

          this.currentVideoIndex = newIndex;
          this.transitioning = false;
        }, 1000); // Match this timing with your pop-out animation duration
      }
    }, 4000); // Change video every 4 seconds (1s pop-out + 3s pause)
  }

  // Function to get a random video from the fullVideoArray
  getRandomVideo() {
    const randomIndex = Math.floor(Math.random() * this.fullVideoArray.length);
    return this.fullVideoArray[randomIndex];
  }

  // Return the correct animation class based on the current index
  getImageClass(index: number) {
    return this.videos[index].state;
  }

  onVideoLoaded(index: number) {
    // Ensure the video plays when the source is updated
    const videoElement = document.querySelectorAll('video')[index] as HTMLVideoElement;
    videoElement.play();
  }
}
