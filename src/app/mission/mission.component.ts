import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mission',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mission.component.html',
  styleUrl: './mission.component.scss'
})
export class MissionComponent {
  largeVideo = { src: 'https://storage.googleapis.com/the-website-guys/Hero-Clips/hero-video.mp4' }; 

  websiteVideos = [
    { src: 'https://storage.googleapis.com/the-website-guys/Hero-Clips/amores-hero-clip.mp4', state: 'default' },
    { src: 'https://storage.googleapis.com/the-website-guys/Hero-Clips/cakes-hero-clip.mp4', state: 'default' },
    { src: 'https://storage.googleapis.com/the-website-guys/Hero-Clips/annie.mp4', state: 'default' },
    { src: 'https://storage.googleapis.com/the-website-guys/Hero-Clips/assetace.mp4' },
    { src: 'https://storage.googleapis.com/the-website-guys/Hero-Clips/ltd.mp4' },
    { src: 'https://storage.googleapis.com/the-website-guys/Hero-Clips/rye.mp4' },
    { src: 'https://storage.googleapis.com/the-website-guys/Hero-Clips/48.mp4' }
  ];

  podcastVideos = [
    { src: 'https://storage.googleapis.com/the-website-guys/Hero-Clips/orlando.mp4' },
    { src: 'https://storage.googleapis.com/the-website-guys/Hero-Clips/phil.mp4' },
    { src: 'https://storage.googleapis.com/the-website-guys/Hero-Clips/phil2.mp4' },
    { src: 'https://storage.googleapis.com/the-website-guys/Hero-Clips/jared.mp4' },
    { src: 'https://storage.googleapis.com/the-website-guys/Hero-Clips/andy-hero-clip.mp4', state: 'default' },
    { src: 'https://storage.googleapis.com/the-website-guys/Hero-Clips/jeremy-hero-clip.mp4', state: 'default' },
    { src: 'https://storage.googleapis.com/the-website-guys/Hero-Clips/luke-hero-clip.mp4', state: 'default' },
    { src: 'https://storage.googleapis.com/the-website-guys/Hero-Clips/oliver-hero-clip.mp4', state: 'default' },
    { src: 'https://storage.googleapis.com/the-website-guys/Hero-Clips/riverside-hero-clip.mp4', state: 'default' }
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
