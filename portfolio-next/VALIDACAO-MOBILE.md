# Correções de navegação e desempenho

As alterações preservam a introdução animada, as entradas das seções, a hero animada no celular e a cena Spline em computadores compatíveis.

- A introdução não altera mais o `overflow` do documento. Toque, encerramento automático e um prazo máximo de saída impedem que ela mantenha a página bloqueada. Falhas de armazenamento ou WebGL não impedem a saída.
- Links internos funcionam nativamente no celular e mesmo antes do carregamento do Lenis. No desktop, o deslocamento usa o `scroll-padding-top` sem descontar duas vezes a altura do menu.
- Menu compacto até 1023px, com rolagem própria em paisagem, fechamento ao navegar e ao tocar fora; palavras do título não quebram entre letras.
- Efeitos recorrentes da hero e da faixa de tecnologias pausam fora da tela. A cena Spline espera a introdução terminar e pausa fora da área visível, preservando a instância carregada.
- Barras de progresso e spotlight usam transformações. As fontes usam as variáveis do `next/font`, e efeitos decorativos caros são simplificados em dispositivos de toque.
- O formulário tem prazo de espera de 15 segundos e oferece um link de e-mail em caso de falha, preservando o texto digitado.

## Executar a validação

```sh
npm ci
npx playwright install chromium webkit
npm run lint
npm run build
npm run test:e2e
```

Os testes usam a versão de produção e iniciam um servidor local na porta 3100. Encerre servidores antigos nessa porta antes de testar um novo build.

A suíte cobre Chromium com dois perfis Android, Chromium desktop e WebKit com perfil iPhone. Inclui gestos sobre a hero, armazenamento bloqueado, repetição de visita, CPU limitada a 4 vezes mais lenta, rede limitada a 250 KB/s com latência de 120 ms, larguras de 320 a 1440px, menu em paisagem, idiomas, tema, FAQ e formulário. Requisições de envio do formulário são simuladas; nenhum e-mail de teste é enviado.

No Windows, o OneDrive pode expor arquivos sincronizados como links e impedir a descoberta dos testes pelo Playwright. Se ocorrer `No tests found`, execute em uma cópia local fora da pasta sincronizada.

## Limites

Resultado da suíte em 17/09/2026: 28 testes aprovados; 8 combinações não aplicáveis foram ignoradas (por exemplo, gestos Android no desktop).

A emulação não substitui o teste físico nos aparelhos Xiaomi e Samsung mencionados. Esta validação é local; publicar o projeto é necessário para que o domínio utilize as correções. Não foi feita medição comparativa de Core Web Vitals nem teste de entrega real de e-mail.
