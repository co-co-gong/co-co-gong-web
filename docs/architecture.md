# [WIP] FSD architecture

해당 프로젝트는 [FSD architecture](https://feature-sliced.design/kr/)를 따른다.

폴더 구조는 Next.js의 app directory를 사용하기 때문에 아래와 같은 구조를 따른다.

```text
├── app                # NextJS app 폴더
├── src
│   ├── app            # FSD app 폴더
│   ├── entities
│   ├── features
│   ├── pages          # FSD pages 폴더
│   ├── shared
│   ├── widgets
```

## api 로직
