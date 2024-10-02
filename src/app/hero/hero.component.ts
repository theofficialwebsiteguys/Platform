import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  // videos = [
  //   { src: 'assets/hero-clips/amores-hero-clip.mp4', state: 'default' },
  //   { src: 'assets/hero-clips/andy-hero-clip.mp4', state: 'default' },
  //   { src: 'assets/hero-clips/cakes-hero-clip.mp4', state: 'default' },
  //   { src: 'assets/hero-clips/jeremy-hero-clip.mp4', state: 'default' },
  //   { src: 'assets/hero-clips/luke-hero-clip.mp4', state: 'default' },
  //   { src: 'assets/hero-clips/oliver-hero-clip.mp4', state: 'default' },
  //   { src: 'assets/hero-clips/riverside-hero-clip.mp4', state: 'default' },
  //   { src: 'assets/hero-clips/annie.mp4', state: 'default' },
  //   { src: 'assets/default.jpg', state: 'default' }
  // ];

  largeVideo = { src: 'assets/hero-clips/hero-video.mp4' }; 

  websiteVideos = [
    { src: 'assets/hero-clips/amores-hero-clip.mp4', state: 'default' },
    { src: 'assets/hero-clips/cakes-hero-clip.mp4', state: 'default' },
    { src: 'assets/hero-clips/annie.mp4', state: 'default' },
    { src: 'assets/hero-clips/assetace.mp4' },
    { src: 'assets/hero-clips/ltd.mp4' },
    { src: 'assets/hero-clips/rye.mp4' },
    { src: 'assets/hero-clips/48.mp4' }
  ];

  podcastVideos = [
    { src: 'assets/hero-clips/orlando.mp4' },
    { src: 'assets/hero-clips/phil.mp4' },
    { src: 'assets/hero-clips/phil2.mp4' },
    { src: 'assets/hero-clips/jared.mp4' },
    { src: 'assets/hero-clips/andy-hero-clip.mp4', state: 'default' },
    { src: 'assets/hero-clips/jeremy-hero-clip.mp4', state: 'default' },
    { src: 'assets/hero-clips/luke-hero-clip.mp4', state: 'default' },
    { src: 'assets/hero-clips/oliver-hero-clip.mp4', state: 'default' },
    { src: 'assets/hero-clips/riverside-hero-clip.mp4', state: 'default' }
  ];

  // Define which grid slots are for podcast and website videos
  videoSlots = [
    { type: 'podcast', src: this.podcastVideos[0].src, state: 'default' },
    { type: 'website', src: this.websiteVideos[0].src, state: 'default' },
    { type: 'podcast', src: this.podcastVideos[1].src, state: 'default' },

    { type: 'website', src: this.websiteVideos[1].src, state: 'default' },
    { type: 'podcast', src: this.podcastVideos[2].src, state: 'default' },
    { type: 'website', src: this.websiteVideos[2].src, state: 'default' },

    { type: 'podcast', src: this.podcastVideos[3].src, state: 'default' },
    { type: 'website', src: this.websiteVideos[3].src, state: 'default' },
    { type: 'website', src: this.websiteVideos[4].src, state: 'default' }
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
        this.videoSlots[this.currentVideoIndex].state = 'pop-out';

        setTimeout(() => {
          // Get all currently displayed video sources
          const currentlyDisplayedVideos = this.videoSlots.map(slot => slot.src);

          // Determine which type of video should go in this slot
          const currentSlot = this.videoSlots[this.currentVideoIndex];
          const newVideo = currentSlot.type === 'website'
            ? this.getUniqueRandomVideo(this.websiteVideos, currentlyDisplayedVideos)
            : this.getUniqueRandomVideo(this.podcastVideos, currentlyDisplayedVideos);

          // Update the current video's source in the visible grid
          this.videoSlots[this.currentVideoIndex].src = newVideo.src;
          this.videoSlots[this.currentVideoIndex].state = 'pop-in';

          // Pick a new random index for the next transition
          let newIndex: number;
          do {
            newIndex = Math.floor(Math.random() * this.videoSlots.length);
          } while (newIndex === this.currentVideoIndex);

          this.currentVideoIndex = newIndex;
          this.transitioning = false;
        }, 1000); // Match this timing with your pop-out animation duration
      }
    }, 4000); // Change video every 4 seconds (1s pop-out + 3s pause)
  }

  // Function to get a unique random video that is not currently displayed
  getUniqueRandomVideo(videoArray: any[], currentlyDisplayedVideos: string[]) {
    const availableVideos = videoArray.filter(video => !currentlyDisplayedVideos.includes(video.src));
    const randomIndex = Math.floor(Math.random() * availableVideos.length);
    return availableVideos[randomIndex];
  }

  // Return the correct animation class based on the current index
  getImageClass(index: number) {
    return this.videoSlots[index].state;
  }

  onVideoLoaded(index: number) {
    const videoElement = document.querySelectorAll('video')[index] as HTMLVideoElement;
    videoElement.play();
  }
}
