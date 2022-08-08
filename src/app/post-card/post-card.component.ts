import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Posts } from '../posts';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() p!: Posts;

  @Output() shotId = new EventEmitter<number>();

  constructor(private post$: PostsService) {}

  ngOnInit(): void {}
  delete() {
    this.post$.deletePost(this.p.id);
    this.shotId.emit(this.p.id);
  }
}
