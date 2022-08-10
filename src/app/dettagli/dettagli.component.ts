import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Posts } from '../posts';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-dettagli',
  templateUrl: './dettagli.component.html',
  styleUrls: ['./dettagli.component.scss'],
})
export class DettagliComponent implements OnInit {
  p!: any;

  sub!: Subscription;

  constructor(private post$: PostsService, private router: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.router.params.subscribe((res) => {
      let id = +res['id'];

      this.post$.getSinglePost(id).subscribe((res) => {
        this.p = res;
        console.log(res);
      });
    });
  }
}
