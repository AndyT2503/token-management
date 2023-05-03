# TokenManagement

Project sử dụng Angular version 15.1.1

## UI Library

[Ng-Zorro](https://ng.ant.design/)

## Setup start

`npm install` để install các dependency
`npm start` để start project. Project local sẽ chạy ở url `http://localhost:4200/`

## Cấu trúc project

```
└── src
    └─ app
    |   ├─ buy-token
    |   ├─ games
    |   ├─ login
    |   ├─ transaction-history
    |   ├─ main
    |   ├─ shared
    |   |    ├─ guard
    |   |    ├─ services
    |   |    ├─ models
    |   ├─ app-routing.modules.ts
    |   ├─ app.component.html
    |   └─ app.module.ts
    ├─ environments
```

- environments: Chứa 2 file environment để tương ứng 2 môi trường develop và production. 2 file này sẽ sửa apiUrl domain của backend
- shared: Chứa các thành phần dùng chung co cả app: service, guard, model
- models: Chứa các file định nghĩa các interface là model các response trả từ BE
- services: Chứa `api.service` để gọi api và `user-info.service` để lưu trữ thông tin user như token balance, username trên memory
- guard: Chứa các file [guard](https://codecraft.tv/courses/angular/routing/router-guards/) để check có được navigate tới 1 route hay không
- buy-token, games, transaction-history: Các component tương ứng với mỗi feature của trang
- login: Component Login
- main: Component wrapper 3 component feature. Hiển thị header và router-oulet để show các component feature
- app-routing.module.ts: File config router
- app.component.ts: Root component
- app.module.ts: Root module chứa các config để init app

## Luồng hoạt động Router

```
app-routing.module.ts

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
    canMatch: [nonAuthGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./main/main.component').then((c) => c.MainComponent),
    canMatch: [authGuard],
    children: [
      {
        path: 'transaction-history',
        loadComponent: () =>
          import('./transaction-history/transaction-history.component').then(
            (c) => c.TransactionHistoryComponent
          ),
      },
      {
        path: 'buy-token',
        loadComponent: () =>
          import('./buy-token/buy-token.component').then(
            (c) => c.BuyTokenComponent
          ),
      },
      {
        path: 'play-game',
        loadComponent: () =>
          import('./games/games.component').then((c) => c.GamesComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'transaction-history',
      },
    ],
  },
];
```

1. `router-outlet` trong `app.component.ts` sẽ dựa vào config router ở trên xác định component cần hiển thị là `login` hay `main`.
2. Khi mở trang lần đầu `authGuard` sẽ check có login bằng username hay chưa, chưa thì redirect qua trang login bằng user name.
3. Login bằng username thành công sẽ redirect về `main`. Lúc này `router-outlet` trong `main.component.ts` sẽ dựa vào config router trong `children` của `main` để xác mở component `transaction-history`, `buy-token`, `play-game`. Trường hợp empty path thì redirect về `transaction-history`.
   **Note**: Khi user đã login thành công thì không thể back về trang login bằng nút back trên browser do `nonAuthGuard` chặn. Muốn back lại thì refresh lại page

## Tạo các api tương ứng dựa theo API Service

Cần tạo đủ các api với các chức năng tương ứng tên hàm định nghĩa trong `api.service.ts`

```
getTransactionHistory(username: string): Observable<TransactionHistory[]> {
    return this.httpClient.get<TransactionHistory[]>('add api get transaction here', {
       params: {
        username
      }
    })
}
```

Vd với API `getTransactionHistory`, theo định nghĩa sẽ cần trả về response là 1 array interface `TransactionHistory`

```
export interface TransactionHistory {
  id: number;
  action: string;
  numberOfTokens: number; //Number of token used or buy
  balanceToken: number; //Balance token after used or buy
  transactionTime: string; // Format ISOstring '2023-05-03T10:07:06.538Z'
}
```

example response:

```
[
      {
        id: 1,
        action: 'Buy 10 token',
        numberOfTokens: 10,
        balanceToken: 10,
        transactionTime: '2023-05-03T10:07:06.538Z'
      },
      {
        id: 2,
        action: 'Play 5 token game abc',
        numberOfTokens: 5,
        balanceToken: 5,
        transactionTime: '2023-05-03T10:07:06.538Z'
      }
]
```

Nếu cần thay đổi response trả về (thêm, bỏ trường hoặc update type). VD bỏ trường transactionTime cần vô `model.ts` update lại interface TransactionHistory

```
export interface TransactionHistory {
  id: number;
  action: string;
  numberOfTokens: number; //Number of token used or buy
  balanceToken: number; //Balance token after used or buy
  //Remove it
  //transactionTime: string; // Format ISOstring '2023-05-03T10:07:06.538Z'
}
```

Expect API này nhận vào params là username. Trường hợp ko cần params này hoặc thêm params khác thì update trong params của method `getTransactionHistory()` và cập nhật lại các chỗ gọi hàm này. Đồng thời remove hoặc update lại params trong `httpClient.get`

```
return this.httpClient.get<TransactionHistory[]>('add api get transaction here', {
    params: {
      username //Cập nhật lại chỗ này nếu cần
    }
})
```
Để cập nhật endpoint: Vd enpoint url là: `https://api.test.com/transaction-history`
Phần `https://api.test.com` là domain api sẽ cập nhật vào trường `apiUrl` trong file `environment.ts` (domain localhost để dev ở local) và `environment.prod.ts` (domain sau khi deploy api). Trường hợp ko deploy api thì 2 file giống nhau.
Trong file `api.service.ts` ỏ `'add api get transaction here'` cập nhật như bên dưới
```
return this.httpClient.get<TransactionHistory[]>(this.apiUrl + '/transaction-history', {
    params: {
      username
    }
})
```

## Một số tính năng mới Angular được áp dụng trong project

Trong project có sử dụng `inject` và `standalone component` function là tính năng mới từ Angular v14

`inject` https://angular.io/api/core/inject function liên quan tới Dependency Injection dùng để inject các service

```
class AComponent {
  private readonly aService = inject(AService);
}
```

tương đương code bên dưới cho version trước 14

```
class AComponent {
  constructor(
    private readonly aService: AService
  ) {
  }
}
```

`standalone component` https://angular.io/guide/standalone-components. Mỗi component bây giờ không cần khai báo trong declaration ở `NgModule` mà chỉ cần config standalone thì có thể sử dụng trực tiếp

```
@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [NzTableModule, NgFor, DatePipe],
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
})
```

Các module cần được sử dụng sẽ được import trực tiếp vào trong decorator của Component(@Component{})
