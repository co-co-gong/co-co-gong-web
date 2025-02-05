# FSD architecture

해당 프로젝트는 [FSD architecture](https://feature-sliced.design/kr/)를 따른다.

폴더 구조는 Next.js의 app directory를 사용하기 때문에 아래와 같은 구조를 따른다.

보통의 경우는 segment 단위에서의 barrel file을 import해오는 것이 convention이나,
tree-shaking에 좋지 않은 영향을 끼치기 때문에, 무조건적으로 지키지는 않는다.

```text
├── app                # NextJS app 폴더
├── src
│   ├── app            # FSD app 폴더
│   ├── entities
│   ├── features
│   ├── view            # FSD pages 폴더
│   ├── shared
│   ├── widgets
```

### Logs

- src/pages 폴더를 사용하려 하였으나, 빌드 시 [Page Without Valid React Component](https://nextjs.org/docs/messages/page-without-valid-component) 에러가 나서 pages -> views로 네이밍 변경 [2025.01.25]
