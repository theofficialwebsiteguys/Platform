import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductHeroComponent } from '../product-hero/product-hero.component';
import { PortfolioCarouselComponent } from '../portfolio-carousel/portfolio-carousel.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductHeroComponent, PortfolioCarouselComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
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
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.startVideoRotation();
    }
  }

  startVideoRotation() {
    setInterval(() => {
      if (!this.transitioning && this.isBrowser) {
        this.transitioning = true;

        this.videoSlots[this.currentVideoIndex].state = 'pop-out';

        setTimeout(() => {
          const currentlyDisplayedVideos = this.videoSlots.map(slot => slot.src);
          const currentSlot = this.videoSlots[this.currentVideoIndex];

          const newVideo = currentSlot.type === 'website'
            ? this.getUniqueRandomVideo(this.websiteVideos, currentlyDisplayedVideos)
            : this.getUniqueRandomVideo(this.podcastVideos, currentlyDisplayedVideos);

          this.videoSlots[this.currentVideoIndex].src = newVideo.src;
          this.videoSlots[this.currentVideoIndex].state = 'pop-in';

          let newIndex: number;
          do {
            newIndex = Math.floor(Math.random() * this.videoSlots.length);
          } while (newIndex === this.currentVideoIndex);

          this.currentVideoIndex = newIndex;
          this.transitioning = false;
        }, 1000);
      }
    }, 4000);
  }

  getUniqueRandomVideo(videoArray: any[], currentlyDisplayedVideos: string[]) {
    const availableVideos = videoArray.filter(video => !currentlyDisplayedVideos.includes(video.src));
    const randomIndex = Math.floor(Math.random() * availableVideos.length);
    return availableVideos[randomIndex];
  }

  getImageClass(index: number) {
    return this.videoSlots[index].state;
  }

  onVideoLoaded(index: number) {
    if (!this.isBrowser) return;

    const videoElement = document.querySelectorAll('video')[index] as HTMLVideoElement;
    if (videoElement) {
      videoElement.play();
    }
  }
}
