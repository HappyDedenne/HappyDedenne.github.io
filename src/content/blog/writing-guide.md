---
title: 記事の書き方サンプル
description: このブログで使える書式（数式・コード・表・画像）の見本です。draft なので公開はされません。
pubDate: 2026-11-17
tags: [meta, howto]
lang: ja
draft: true
---

この記事は `draft: true` なので、`npm run dev` のプレビューにだけ表示され、本番のサイトには出ません。新しく記事を書くときの見本として使ってください。

## 見出しと文章

本文はふつうの Markdown で書きます。**太字**、*斜体*、[リンク](https://astro.build/)、`インラインコード` が使えます。

### 箇条書き

- SRAM のビット線で積和演算を行う
- 乗算を Lookup Table で置き換える
  - 入れ子もできます

> 引用はこのように表示されます。

## 数式

インライン数式は `$...$` で書きます。例えばスイッチングエネルギーは $E = \alpha C V_{DD}^2$ です。

ディスプレイ数式は `$$...$$` で書きます。

$$
y_j = \sum_{i=1}^{N} w_{ij} \, x_i, \qquad
\mathrm{TOPS/W} = \frac{2 \times \text{\#MAC}}{\text{Energy} \times 10^{12}}
$$

## コード

````md
```python
import torch

def mac(x: torch.Tensor, w: torch.Tensor) -> torch.Tensor:
    return x @ w
```
````

と書くと、次のように表示されます。

```python
import torch

def mac(x: torch.Tensor, w: torch.Tensor) -> torch.Tensor:
    return x @ w
```

```system-verilog
always_ff @(posedge clk) begin
  if (!rst_n) acc <= '0;
  else        acc <= acc + (a * b);
end
```

## 表

| Design | Process | Energy eff. |
| ------ | ------- | ----------- |
| A      | 22 nm   | — TOPS/W    |
| B      | 150 nm  | — TOPS/W    |

## 画像

画像は `public/images/` に置いて、次のように書きます。

```md
![チップ写真](/images/chip.jpg)
```

---

書き終わったら frontmatter の `draft: true` を `false` に変えると公開されます。
