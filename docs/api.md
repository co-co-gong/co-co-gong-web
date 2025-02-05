# API

사용되는 api의 종류로는 크게 두 가지로 나뉜다.

- [ky](https://github.com/sindresorhus/ky)를 이용한 클라이언트단 데이터 페칭
- fetch를 이용한 서버사이드단 데이터 페칭

## Authorization

프로젝트에서는 서버사이드단에서도 fetch를 통해 authorization이 가능하도록 token은 모두 cookies에 저장한다.
[middleware](../middleware.ts)를 통해 authorization이 필요한 페이지에서 valid한 토큰을 가지고 있는지 체크하며,
만료되어있을 경우 refresh로직을 거친다.

refresh 이후 토큰 저장을 위해 cookies를 저장하는 과정에서, next.js에서 cookies를 통해 set-cookie과정을 거치는 것은 ServerActions 혹은 routeHandler를 통해서만 가능하기에, routeHandler api를 하나 제작하여 사용한다.

> [!NOTE]
>
> AuthorizedHandler를 사용함에도 불구하고 middleware를 사용해야 하는 이유
>
> client component가 서버사이드에서 렌더링되는 경우에는 토큰이 유효하지 않거나, 만료된 토큰을 사용할 수도 있기 때문에, 브라우저에서 리소스 요청 시 바로 미들웨어에서 처리하도록 한다.

## Client

- [apiClient](../src/shared/api/apiClient.ts)
- [authApiClient](../src/shared/api/auth/authApiClient.ts)

### apiClient

다른 구현 내용 없이 ky를 사용하여 instance인 apiClient를 만들며, prefixUrl을 세팅한다.

### authApiClient

- 요청 시점에 routeHandler를 통해 token을 가져와 Authorization Bearer Token 세팅
- 토큰이 만료되었을 경우 refresh api를 통해 토큰을 갱신

## Server

- [baseServerApi](../src/shared/api/baseServerApi.ts)
- [apiServer](../src/shared/api/apiServer.ts)
- [routeHandlerApi](../src/shared/api/routeHandlerApi.ts)
- [authApiServer](../src/shared/api/auth/authApiServer.ts)

### baseServerApi

- server api들이 사용할 수 있도록 하는 abstract class
- ky, axios의 형태와 같이 get, post, put, patch, delete를 메서드로 가진다.
- fetch의 next revalidate options는 cache가 'force-cache'인 경우에만 설정할 수 있도록 한다.
  - 별도의 값을 세팅하지 않는 경우 DEFAULT_REVALIDATE
  - false 입력 가능

### apiServer

- baseServerApi를 extends로 하는 클래스이며, singleton 클래스를 사용한다.
- baseUrl은 NEXT_PUBLIC_API_URL, 즉 서버 API_URL로 한다.
- authorization이 필요하지 않은 서버사이드에서의 서버 api 호출을 목적으로 한다.

### routeHandlerApi

- baseServerApi를 extends로 하는 클래스이며, singleton 클래스를 사용한다.
- baseUrl은 NEXT_PUBLIC_BASE_API_URL, 즉 프론트엔드 도메인으로 한다.
- routeHandler를 호출하기 위한 목적으로 사용한다.

### authApiServer

- get, mutate 메서드의 경우 cookies() 호출을 통해 accessToken, refreshToken을 가져와 사용하며, 에러가 나는 경우 refreshTokens 메서드를 호출한다.

> [!NOTE]
>
> refreshTokens 메서드에서 refresh routeHandler api를 호출할 시 headers를 같이 넘기는 이유
>
> - 서버사이드단에서 routeHandler를 호출하는 경우, client단의 headers를 받지 못해 실질적으로 쿠키가 넘어오지 않는다. 즉, 서버컴포넌트가 routeHandler를 호출하기 때문.
> - 그렇기에 서버컴포넌트 내에서 호출되는 authApiServer method내에서 Headers 호출을 통해 routeHandler로 직접 headers를 주입해주어야 한다.

> [!NOTE]
>
> get 메서드에서 options에 \_tokens가 필요한 이유
>
> - refreshTokens 호출 이후, 갱신된 토큰을 사용하여 다시 해당 API를 호출하여야 한다.
> - Set-Cookie가 브라우저로 넘어가기 이전이므로, cookies()를 통해 tokens set을 완료하였지만, 실제 적용이 되기 이전이므로 갱신된 토큰을 직접 주입하여 사용해야 한다.

---

## DTO 타입

[해당 파트](https://feature-sliced.design/kr/docs/guides/examples/types#%EB%B9%84%EC%A6%88%EB%8B%88%EC%8A%A4-%EC%97%94%ED%8B%B0%ED%8B%B0-%EB%B0%8F-%EC%83%81%ED%98%B8-%EC%B0%B8%EC%A1%B0-%EA%B4%80%EA%B3%84)에서 설명하듯, a 도메인의 A DTO가 b 도메인의 B DTO를 포함하고 있을 수 있다. e.g, User의 Address.
그런 경우 cross-import 방식으로 사용하여 다른 엔티티에 대한 공개 API를 `@x`를 사용하여 표기한다.

## Queries

- 쿼리 키는 [query-key-factory](https://github.com/lukemorales/query-key-factory)를 사용하며, entities 폴더에서 관리한다.
- slice 별 폴더 구조는 다음과 같다.

```text
entities
└── domain
    └── api
        ├── @x                          # 공개 API
        |   └── other-domain.ts
        ├── domain.interface.ts         # type 명시 파일
        ├── domain.mutation-service.ts  # create, update, delete와 같은 기능을 하는 service 함수
        ├── domain.server-service.ts    # apiServer를 사용해 server side에서 실행되는 service 함수
        ├── domain.route-handler.ts     # routeHandlerApi를 사용하는 함수
        └── domain.query.ts             # query-key-factory를 사용한 쿼리 키 및 함수
```

## Mutations

- mutation은 쿼리와 같이 처리하지 않고, 사용되는 위치의 api segment에서 관리한다.

[관련 문서](https://feature-sliced.design/kr/docs/guides/tech/with-react-query#mutation-%EC%9C%84%EC%B9%98-%EC%84%A4%EC%A0%95-%EB%AC%B8%EC%A0%9C)
