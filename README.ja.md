# address-japan

日本の都道府県、市区町村、町字全件をCSVファイルとしてダウンロードできるプロジェクトです。

## デモ

[日本の市区町村+町字ID](https://code4fukui.github.io/address-japan/city.html)

## 機能

- 都道府県、市区町村、町字の一覧データがダウンロードできる
- 市区町村ごとの町字一覧を参照できる

## 必要環境

Deno環境が必要です。

## 使い方

```
$ mkdir data
$ deno run -A https://code4fukui.github.io/address-japan/downloadAll.js
```

## データ・API

出典： [アドレス・ベース・レジストリ（市区町村マスターデータ）](https://www.digital.go.jp/news/KgQ8ac8h/) [ベース・レジストリ データカタログサイト](https://registry-catalog.registries.digital.go.jp/dataset/o1-000000_g2-000002) （2022年4月26日取得）

## ライセンス

このプロジェクトはMITライセンスで提供されています。