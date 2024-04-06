var Chess = function (r) {
  function e(r) {
    void 0 === r && (r = !1),
      (ar = new Array(128)),
      (cr = { w: $, b: $ }),
      (sr = x),
      (pr = { w: 0, b: 0 }),
      (vr = $),
      (gr = 0),
      (hr = 1),
      (dr = []),
      r || (Er = {}),
      (mr = {}),
      l(u());
  }
  function n() {
    for (
      var r = [],
        e = {},
        n = function (r) {
          (r in mr) && (e[r] = mr[r]);
        };
      dr.length > 0;

    )
      r.push(I());
    for (n(u()); r.length > 0; ) C(r.pop()), n(u());
    mr = e;
  }
  function t() {
    o(Z);
  }
  function o(r, n) {
    void 0 === n && (n = !1);
    var t = r.split(/\s+/),
      o = t[0],
      f = 0;
    if (!i(r).valid) return !1;
    e(n);
    for (var a = 0; a < o.length; a++) {
      var s = o.charAt(a);
      if ("/" === s) f += 8;
      else if (k(s)) f += parseInt(s, 10);
      else {
        var p = s < "a" ? x : U;
        c({ type: s.toLowerCase(), color: p }, O(f)), f++;
      }
    }
    return (
      (sr = t[1]),
      t[2].indexOf("K") > -1 && (pr.w |= nr.KSIDE_CASTLE),
      t[2].indexOf("Q") > -1 && (pr.w |= nr.QSIDE_CASTLE),
      t[2].indexOf("k") > -1 && (pr.b |= nr.KSIDE_CASTLE),
      t[2].indexOf("q") > -1 && (pr.b |= nr.QSIDE_CASTLE),
      (vr = "-" === t[3] ? $ : fr[t[3]]),
      (gr = parseInt(t[4], 10)),
      (hr = parseInt(t[5], 10)),
      l(u()),
      !0
    );
  }
  function i(r) {
    var e = {
        0: "No errors.",
        1: "FEN string must contain six space-delimited fields.",
        2: "6th field (move number) must be a positive integer.",
        3: "5th field (half move counter) must be a non-negative integer.",
        4: "4th field (en-passant square) is invalid.",
        5: "3rd field (castling availability) is invalid.",
        6: "2nd field (side to move) is invalid.",
        7: "1st field (piece positions) does not contain 8 '/'-delimited rows.",
        8: "1st field (piece positions) is invalid [consecutive numbers].",
        9: "1st field (piece positions) is invalid [invalid piece].",
        10: "1st field (piece positions) is invalid [row too large].",
        11: "Illegal en-passant square",
      },
      n = r.split(/\s+/);
    if (6 !== n.length) return { valid: !1, error_number: 1, error: e[1] };
    if (isNaN(n[5]) || parseInt(n[5], 10) <= 0)
      return { valid: !1, error_number: 2, error: e[2] };
    if (isNaN(n[4]) || parseInt(n[4], 10) < 0)
      return { valid: !1, error_number: 3, error: e[3] };
    if (!/^(-|[abcdefgh][36])$/.test(n[3]))
      return { valid: !1, error_number: 4, error: e[4] };
    if (!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(n[2]))
      return { valid: !1, error_number: 5, error: e[5] };
    if (!/^(w|b)$/.test(n[1]))
      return { valid: !1, error_number: 6, error: e[6] };
    var t = n[0].split("/");
    if (8 !== t.length) return { valid: !1, error_number: 7, error: e[7] };
    for (var o = 0; o < t.length; o++) {
      for (var i = 0, u = !1, f = 0; f < t[o].length; f++)
        if (isNaN(t[o][f])) {
          if (!/^[prnbqkPRNBQK]$/.test(t[o][f]))
            return { valid: !1, error_number: 9, error: e[9] };
          (i += 1), (u = !1);
        } else {
          if (u) return { valid: !1, error_number: 8, error: e[8] };
          (i += parseInt(t[o][f], 10)), (u = !0);
        }
      if (8 !== i) return { valid: !1, error_number: 10, error: e[10] };
    }
    return ("3" == n[3][1] && "w" == n[1]) || ("6" == n[3][1] && "b" == n[1])
      ? { valid: !1, error_number: 11, error: e[11] }
      : { valid: !0, error_number: 0, error: e[0] };
  }
  function u() {
    for (var r = 0, e = "", n = fr.a8; n <= fr.h1; n++) {
      if (null == ar[n]) r++;
      else {
        r > 0 && ((e += r), (r = 0));
        var t = ar[n].color,
          o = ar[n].type;
        e += t === x ? o.toUpperCase() : o.toLowerCase();
      }
      (n + 1) & 136 &&
        (r > 0 && (e += r), n !== fr.h1 && (e += "/"), (r = 0), (n += 8));
    }
    var i = "";
    pr[x] & nr.KSIDE_CASTLE && (i += "K"),
      pr[x] & nr.QSIDE_CASTLE && (i += "Q"),
      pr[U] & nr.KSIDE_CASTLE && (i += "k"),
      pr[U] & nr.QSIDE_CASTLE && (i += "q"),
      (i = i || "-");
    var u = vr === $ ? "-" : O(vr);
    return [e, sr, i, u, gr, hr].join(" ");
  }
  function f(r) {
    for (var e = 0; e < r.length; e += 2)
      "string" == typeof r[e] &&
        "string" == typeof r[e + 1] &&
        (Er[r[e]] = r[e + 1]);
    return Er;
  }
  function l(r) {
    dr.length > 0 ||
      (r !== Z
        ? ((Er.SetUp = "1"), (Er.FEN = r))
        : (delete Er.SetUp, delete Er.FEN));
  }
  function a(r) {
    var e = ar[fr[r]];
    return e ? { type: e.type, color: e.color } : null;
  }
  function c(r, e) {
    if (!("type" in r && "color" in r)) return !1;
    if (-1 === H.indexOf(r.type.toLowerCase())) return !1;
    if (!(e in fr)) return !1;
    var n = fr[e];
    return (
      (r.type != F || cr[r.color] == $ || cr[r.color] == n) &&
      ((ar[n] = { type: r.type, color: r.color }),
      r.type === F && (cr[r.color] = n),
      l(u()),
      !0)
    );
  }
  function s(r) {
    var e = a(r);
    return (
      (ar[fr[r]] = null), e && e.type === F && (cr[e.color] = $), l(u()), e
    );
  }
  function p(r, e, n, t, o) {
    var i = { color: sr, from: e, to: n, flags: t, piece: r[e].type };
    return (
      o && ((i.flags |= nr.PROMOTION), (i.promotion = o)),
      r[n] ? (i.captured = r[n].type) : t & nr.EP_CAPTURE && (i.captured = j),
      i
    );
  }
  function v(r) {
    function e(r, e, n, t, o) {
      if (r[n].type !== j || (R(t) !== ur && R(t) !== tr))
        e.push(p(r, n, t, o));
      else
        for (var i = [G, W, M, B], u = 0, f = i.length; u < f; u++)
          e.push(p(r, n, t, o, i[u]));
    }
    var n = [],
      t = sr,
      o = N(t),
      i = { b: ir, w: or },
      u = fr.a8,
      f = fr.h1,
      l = !1,
      a = !(void 0 !== r && "legal" in r) || r.legal;
    if (void 0 !== r && "square" in r) {
      if (!(r.square in fr)) return [];
      (u = f = fr[r.square]), (l = !0);
    }
    for (var c = u; c <= f; c++)
      if (136 & c) c += 7;
      else {
        var s = ar[c];
        if (null != s && s.color === t)
          if (s.type === j) {
            var v = c + J[t][0];
            if (null == ar[v]) {
              e(ar, n, c, v, nr.NORMAL);
              v = c + J[t][1];
              i[t] === R(c) && null == ar[v] && e(ar, n, c, v, nr.BIG_PAWN);
            }
            for (g = 2; g < 4; g++) {
              v = c + J[t][g];
              136 & v ||
                (null != ar[v] && ar[v].color === o
                  ? e(ar, n, c, v, nr.CAPTURE)
                  : v === vr && e(ar, n, c, vr, nr.EP_CAPTURE));
            }
          } else
            for (var g = 0, h = V[s.type].length; g < h; g++) {
              var m = V[s.type][g];
              for (v = c; (v += m), !(136 & v); ) {
                if (null != ar[v]) {
                  if (ar[v].color === t) break;
                  e(ar, n, c, v, nr.CAPTURE);
                  break;
                }
                if (
                  (e(ar, n, c, v, nr.NORMAL), "n" === s.type || "k" === s.type)
                )
                  break;
              }
            }
      }
    if (!l || f === cr[t]) {
      if (pr[t] & nr.KSIDE_CASTLE) {
        var _ = cr[t],
          b = _ + 2;
        null != ar[_ + 1] ||
          null != ar[b] ||
          d(o, cr[t]) ||
          d(o, _ + 1) ||
          d(o, b) ||
          e(ar, n, cr[t], b, nr.KSIDE_CASTLE);
      }
      if (pr[t] & nr.QSIDE_CASTLE) {
        (_ = cr[t]), (b = _ - 2);
        null != ar[_ - 1] ||
          null != ar[_ - 2] ||
          null != ar[_ - 3] ||
          d(o, cr[t]) ||
          d(o, _ - 1) ||
          d(o, b) ||
          e(ar, n, cr[t], b, nr.QSIDE_CASTLE);
      }
    }
    if (!a) return n;
    var A = [];
    for (c = 0, h = n.length; c < h; c++) C(n[c]), E(t) || A.push(n[c]), I();
    return A;
  }
  function g(r, e) {
    var n = "";
    if (r.flags & nr.KSIDE_CASTLE) n = "O-O";
    else if (r.flags & nr.QSIDE_CASTLE) n = "O-O-O";
    else {
      var t = T(r, e);
      r.piece !== j && (n += r.piece.toUpperCase() + t),
        r.flags & (nr.CAPTURE | nr.EP_CAPTURE) &&
          (r.piece === j && (n += O(r.from)[0]), (n += "x")),
        (n += O(r.to)),
        r.flags & nr.PROMOTION && (n += "=" + r.promotion.toUpperCase());
    }
    return C(r), m() && (_() ? (n += "#") : (n += "+")), I(), n;
  }
  function h(r) {
    return r.replace(/=/, "").replace(/[+#]?[?!]*$/, "");
  }
  function d(r, e) {
    for (var n = fr.a8; n <= fr.h1; n++)
      if (136 & n) n += 7;
      else if (null != ar[n] && ar[n].color === r) {
        var t = ar[n],
          o = n - e,
          i = o + 119;
        if (X[i] & (1 << rr[t.type])) {
          if (t.type === j) {
            if (o > 0) {
              if (t.color === x) return !0;
            } else if (t.color === U) return !0;
            continue;
          }
          if ("n" === t.type || "k" === t.type) return !0;
          for (var u = Y[i], f = n + u, l = !1; f !== e; ) {
            if (null != ar[f]) {
              l = !0;
              break;
            }
            f += u;
          }
          if (!l) return !0;
        }
      }
    return !1;
  }
  function E(r) {
    return d(N(r), cr[r]);
  }
  function m() {
    return E(sr);
  }
  function _() {
    return m() && 0 === v().length;
  }
  function b() {
    return !m() && 0 === v().length;
  }
  function A() {
    for (var r = {}, e = [], n = 0, t = 0, o = fr.a8; o <= fr.h1; o++)
      if (((t = (t + 1) % 2), 136 & o)) o += 7;
      else {
        var i = ar[o];
        i &&
          ((r[i.type] = i.type in r ? r[i.type] + 1 : 1),
          i.type === M && e.push(t),
          n++);
      }
    if (2 === n) return !0;
    if (3 === n && (1 === r[M] || 1 === r[B])) return !0;
    if (n === r[M] + 2) {
      var u = 0,
        f = e.length;
      for (o = 0; o < f; o++) u += e[o];
      if (0 === u || u === f) return !0;
    }
    return !1;
  }
  function y() {
    for (var r = [], e = {}, n = !1; ; ) {
      var t = I();
      if (!t) break;
      r.push(t);
    }
    for (;;) {
      var o = u().split(" ").slice(0, 4).join(" ");
      if (((e[o] = o in e ? e[o] + 1 : 1), e[o] >= 3 && (n = !0), !r.length))
        break;
      C(r.pop());
    }
    return n;
  }
  function S(r) {
    dr.push({
      move: r,
      kings: { b: cr.b, w: cr.w },
      turn: sr,
      castling: { b: pr.b, w: pr.w },
      ep_square: vr,
      half_moves: gr,
      move_number: hr,
    });
  }
  function C(r) {
    var e = sr,
      n = N(e);
    if (
      (S(r),
      (ar[r.to] = ar[r.from]),
      (ar[r.from] = null),
      r.flags & nr.EP_CAPTURE &&
        (sr === U ? (ar[r.to - 16] = null) : (ar[r.to + 16] = null)),
      r.flags & nr.PROMOTION && (ar[r.to] = { type: r.promotion, color: e }),
      ar[r.to].type === F)
    ) {
      if (((cr[ar[r.to].color] = r.to), r.flags & nr.KSIDE_CASTLE)) {
        var t = r.to - 1,
          o = r.to + 1;
        (ar[t] = ar[o]), (ar[o] = null);
      } else if (r.flags & nr.QSIDE_CASTLE) {
        (t = r.to + 1), (o = r.to - 2);
        (ar[t] = ar[o]), (ar[o] = null);
      }
      pr[e] = "";
    }
    if (pr[e])
      for (var i = 0, u = lr[e].length; i < u; i++)
        if (r.from === lr[e][i].square && pr[e] & lr[e][i].flag) {
          pr[e] ^= lr[e][i].flag;
          break;
        }
    if (pr[n])
      for (i = 0, u = lr[n].length; i < u; i++)
        if (r.to === lr[n][i].square && pr[n] & lr[n][i].flag) {
          pr[n] ^= lr[n][i].flag;
          break;
        }
    (vr = r.flags & nr.BIG_PAWN ? ("b" === sr ? r.to - 16 : r.to + 16) : $),
      r.piece === j
        ? (gr = 0)
        : r.flags & (nr.CAPTURE | nr.EP_CAPTURE)
        ? (gr = 0)
        : gr++,
      sr === U && hr++,
      (sr = N(sr));
  }
  function I() {
    var r = dr.pop();
    if (null == r) return null;
    var e = r.move;
    (cr = r.kings),
      (sr = r.turn),
      (pr = r.castling),
      (vr = r.ep_square),
      (gr = r.half_moves),
      (hr = r.move_number);
    var n,
      t,
      o = sr,
      i = N(sr);
    if (
      ((ar[e.from] = ar[e.to]),
      (ar[e.from].type = e.piece),
      (ar[e.to] = null),
      e.flags & nr.CAPTURE)
    )
      ar[e.to] = { type: e.captured, color: i };
    else if (e.flags & nr.EP_CAPTURE) {
      var u;
      (u = o === U ? e.to - 16 : e.to + 16), (ar[u] = { type: j, color: i });
    }
    e.flags & (nr.KSIDE_CASTLE | nr.QSIDE_CASTLE) &&
      (e.flags & nr.KSIDE_CASTLE
        ? ((n = e.to + 1), (t = e.to - 1))
        : e.flags & nr.QSIDE_CASTLE && ((n = e.to - 2), (t = e.to + 1)),
      (ar[n] = ar[t]),
      (ar[t] = null));
    return e;
  }
  function T(r, e) {
    for (
      var n = v({ legal: !e }),
        t = r.from,
        o = r.to,
        i = r.piece,
        u = 0,
        f = 0,
        l = 0,
        a = 0,
        c = n.length;
      a < c;
      a++
    ) {
      var s = n[a].from,
        p = n[a].to,
        g = n[a].piece;
      i === g &&
        t !== s &&
        o === p &&
        (u++, R(t) === R(s) && f++, L(t) === L(s) && l++);
    }
    return u > 0
      ? f > 0 && l > 0
        ? O(t)
        : l > 0
        ? O(t).charAt(1)
        : O(t).charAt(0)
      : "";
  }
  function P() {
    for (
      var r = "   +------------------------+\n", e = fr.a8;
      e <= fr.h1;
      e++
    ) {
      if ((0 === L(e) && (r += " " + "87654321"[R(e)] + " |"), null == ar[e]))
        r += " . ";
      else {
        var n = ar[e].type,
          t = ar[e].color,
          o = t === x ? n.toUpperCase() : n.toLowerCase();
        r += " " + o + " ";
      }
      (e + 1) & 136 && ((r += "|\n"), (e += 8));
    }
    return (
      (r += "   +------------------------+\n"),
      (r += "     a  b  c  d  e  f  g  h\n"),
      r
    );
  }
  function w(r, e) {
    var n = h(r);
    if (e) {
      var t = n.match(
        /([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/
      );
      if (t)
        var o = t[1],
          i = t[2],
          u = t[3],
          f = t[4];
    }
    for (var l = v(), a = 0, c = l.length; a < c; a++) {
      if (n === h(g(l[a])) || (e && n === h(g(l[a], !0)))) return l[a];
      if (
        t &&
        (!o || o.toLowerCase() == l[a].piece) &&
        fr[i] == l[a].from &&
        fr[u] == l[a].to &&
        (!f || f.toLowerCase() == l[a].promotion)
      )
        return l[a];
    }
    return null;
  }
  function R(r) {
    return r >> 4;
  }
  function L(r) {
    return 15 & r;
  }
  function O(r) {
    var e = L(r),
      n = R(r);
    return "abcdefgh".substring(e, e + 1) + "87654321".substring(n, n + 1);
  }
  function N(r) {
    return r === x ? U : x;
  }
  function k(r) {
    return -1 !== "0123456789".indexOf(r);
  }
  function q(r) {
    var e = D(r);
    (e.san = g(e, !1)), (e.to = O(e.to)), (e.from = O(e.from));
    var n = "";
    for (var t in nr) nr[t] & e.flags && (n += er[t]);
    return (e.flags = n), e;
  }
  function D(r) {
    var e = r instanceof Array ? [] : {};
    for (var n in r) e[n] = "object" == typeof n ? D(r[n]) : r[n];
    return e;
  }
  function K(r) {
    return r.replace(/^\s+|\s+$/g, "");
  }
  function Q(r) {
    for (
      var e = v({ legal: !1 }), n = 0, t = sr, o = 0, i = e.length;
      o < i;
      o++
    ) {
      if ((C(e[o]), !E(t)))
        if (r - 1 > 0) {
          var u = Q(r - 1);
          n += u;
        } else n++;
      I();
    }
    return n;
  }
  var U = "b",
    x = "w",
    $ = -1,
    j = "p",
    B = "n",
    M = "b",
    W = "r",
    G = "q",
    F = "k",
    H = "pnbrqkPNBRQK",
    Z = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    z = ["1-0", "0-1", "1/2-1/2", "*"],
    J = { b: [16, 32, 17, 15], w: [-16, -32, -17, -15] },
    V = {
      n: [-18, -33, -31, -14, 18, 33, 31, 14],
      b: [-17, -15, 17, 15],
      r: [-16, 1, 16, -1],
      q: [-17, -16, -15, 1, 17, 16, 15, -1],
      k: [-17, -16, -15, 1, 17, 16, 15, -1],
    },
    X = [
      20, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20, 0, 0, 20, 0, 0, 0, 0, 0,
      24, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0,
      0, 0, 0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 20,
      0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0, 24, 24, 24,
      24, 24, 24, 56, 0, 56, 24, 24, 24, 24, 24, 24, 0, 0, 0, 0, 0, 0, 2, 53,
      56, 53, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0,
      0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0,
      20, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0, 20, 0, 0,
      0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20,
    ],
    Y = [
      17, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 15, 0, 0, 17, 0, 0, 0, 0, 0,
      16, 0, 0, 0, 0, 0, 15, 0, 0, 0, 0, 17, 0, 0, 0, 0, 16, 0, 0, 0, 0, 15, 0,
      0, 0, 0, 0, 0, 17, 0, 0, 0, 16, 0, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 17,
      0, 0, 16, 0, 0, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 0, 16, 0, 15, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 16, 15, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
      1, 1, 1, 0, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, -15, -16,
      -17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -15, 0, -16, 0, -17, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, -15, 0, 0, -16, 0, 0, -17, 0, 0, 0, 0, 0, 0, 0, 0, -15,
      0, 0, 0, -16, 0, 0, 0, -17, 0, 0, 0, 0, 0, 0, -15, 0, 0, 0, 0, -16, 0, 0,
      0, 0, -17, 0, 0, 0, 0, -15, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, -17, 0, 0,
      -15, 0, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, 0, -17,
    ],
    rr = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 },
    er = {
      NORMAL: "n",
      CAPTURE: "c",
      BIG_PAWN: "b",
      EP_CAPTURE: "e",
      PROMOTION: "p",
      KSIDE_CASTLE: "k",
      QSIDE_CASTLE: "q",
    },
    nr = {
      NORMAL: 1,
      CAPTURE: 2,
      BIG_PAWN: 4,
      EP_CAPTURE: 8,
      PROMOTION: 16,
      KSIDE_CASTLE: 32,
      QSIDE_CASTLE: 64,
    },
    tr = 7,
    or = 6,
    ir = 1,
    ur = 0,
    fr = {
      a8: 0,
      b8: 1,
      c8: 2,
      d8: 3,
      e8: 4,
      f8: 5,
      g8: 6,
      h8: 7,
      a7: 16,
      b7: 17,
      c7: 18,
      d7: 19,
      e7: 20,
      f7: 21,
      g7: 22,
      h7: 23,
      a6: 32,
      b6: 33,
      c6: 34,
      d6: 35,
      e6: 36,
      f6: 37,
      g6: 38,
      h6: 39,
      a5: 48,
      b5: 49,
      c5: 50,
      d5: 51,
      e5: 52,
      f5: 53,
      g5: 54,
      h5: 55,
      a4: 64,
      b4: 65,
      c4: 66,
      d4: 67,
      e4: 68,
      f4: 69,
      g4: 70,
      h4: 71,
      a3: 80,
      b3: 81,
      c3: 82,
      d3: 83,
      e3: 84,
      f3: 85,
      g3: 86,
      h3: 87,
      a2: 96,
      b2: 97,
      c2: 98,
      d2: 99,
      e2: 100,
      f2: 101,
      g2: 102,
      h2: 103,
      a1: 112,
      b1: 113,
      c1: 114,
      d1: 115,
      e1: 116,
      f1: 117,
      g1: 118,
      h1: 119,
    },
    lr = {
      w: [
        { square: fr.a1, flag: nr.QSIDE_CASTLE },
        { square: fr.h1, flag: nr.KSIDE_CASTLE },
      ],
      b: [
        { square: fr.a8, flag: nr.QSIDE_CASTLE },
        { square: fr.h8, flag: nr.KSIDE_CASTLE },
      ],
    },
    ar = new Array(128),
    cr = { w: $, b: $ },
    sr = x,
    pr = { w: 0, b: 0 },
    vr = $,
    gr = 0,
    hr = 1,
    dr = [],
    Er = {},
    mr = {};
  return (
    o(void 0 === r ? Z : r),
    {
      WHITE: x,
      BLACK: U,
      PAWN: j,
      KNIGHT: B,
      BISHOP: M,
      ROOK: W,
      QUEEN: G,
      KING: F,
      SQUARES: (function () {
        for (var r = [], e = fr.a8; e <= fr.h1; e++)
          136 & e ? (e += 7) : r.push(O(e));
        return r;
      })(),
      FLAGS: er,
      load: function (r) {
        return o(r);
      },
      reset: function () {
        return t();
      },
      moves: function (r) {
        for (var e = v(r), n = [], t = 0, o = e.length; t < o; t++)
          void 0 !== r && "verbose" in r && r.verbose
            ? n.push(q(e[t]))
            : n.push(g(e[t], !1));
        return n;
      },
      ugly_moves: function (r) {
        var e = v(r);
        return e;
      },
      in_check: function () {
        return m();
      },
      in_checkmate: function () {
        return _();
      },
      in_stalemate: function () {
        return b();
      },
      in_draw: function () {
        return gr >= 100 || b() || A() || y();
      },
      insufficient_material: function () {
        return A();
      },
      in_threefold_repetition: function () {
        return y();
      },
      game_over: function () {
        return gr >= 100 || _() || b() || A() || y();
      },
      validate_fen: function (r) {
        return i(r);
      },
      fen: function () {
        return u();
      },
      board: function () {
        for (var r = [], e = [], n = fr.a8; n <= fr.h1; n++)
          null == ar[n]
            ? e.push(null)
            : e.push({ type: ar[n].type, color: ar[n].color }),
            (n + 1) & 136 && (r.push(e), (e = []), (n += 8));
        return r;
      },
      pgn: function (r) {
        var e =
            "object" == typeof r && "string" == typeof r.newline_char
              ? r.newline_char
              : "\n",
          n =
            "object" == typeof r && "number" == typeof r.max_width
              ? r.max_width
              : 0,
          t = [],
          o = !1;
        for (var i in Er) t.push("[" + i + ' "' + Er[i] + '"]' + e), (o = !0);
        o && dr.length && t.push(e);
        for (
          var f = function (r) {
              var e = mr[u()];
              if (void 0 !== e) {
                var n = r.length > 0 ? " " : "";
                r = `${r}${n}{${e}}`;
              }
              return r;
            },
            l = [];
          dr.length > 0;

        )
          l.push(I());
        var a = [],
          c = "";
        for (0 === l.length && a.push(f("")); l.length > 0; ) {
          c = f(c);
          var s = l.pop();
          dr.length || "b" !== s.color
            ? "w" === s.color && (c.length && a.push(c), (c = hr + "."))
            : (c = hr + ". ..."),
            (c = c + " " + g(s, !1)),
            C(s);
        }
        if (
          (c.length && a.push(f(c)),
          void 0 !== Er.Result && a.push(Er.Result),
          0 === n)
        )
          return t.join("") + a.join(" ");
        var p = function () {
            return t.length > 0 && " " === t[t.length - 1] && (t.pop(), !0);
          },
          v = function (r, o) {
            for (var i of o.split(" "))
              if (i) {
                if (r + i.length > n) {
                  for (; p(); ) r--;
                  t.push(e), (r = 0);
                }
                t.push(i), (r += i.length), t.push(" "), r++;
              }
            return p() && r--, r;
          },
          h = 0;
        for (i = 0; i < a.length; i++)
          h + a[i].length > n && a[i].includes("{")
            ? (h = v(h, a[i]))
            : (h + a[i].length > n && 0 !== i
                ? (" " === t[t.length - 1] && t.pop(), t.push(e), (h = 0))
                : 0 !== i && (t.push(" "), h++),
              t.push(a[i]),
              (h += a[i].length));
        return t.join("");
      },
      load_pgn: function (r, e) {
        function n(r) {
          return r.replace(/\\/g, "\\");
        }
        function i(r) {
          for (var e in r) return !0;
          return !1;
        }
        function l(r, e) {
          for (
            var t =
                "object" == typeof e && "string" == typeof e.newline_char
                  ? e.newline_char
                  : "\r?\n",
              o = {},
              i = r.split(new RegExp(n(t))),
              u = "",
              f = "",
              l = 0;
            l < i.length;
            l++
          )
            (u = i[l].replace(/^\[([A-Z][A-Za-z]*)\s.*\]$/, "$1")),
              (f = i[l].replace(/^\[[A-Za-z]+\s"(.*)"\ *\]$/, "$1")),
              K(u).length > 0 && (o[u] = f);
          return o;
        }
        var a = void 0 !== e && "sloppy" in e && e.sloppy,
          c =
            "object" == typeof e && "string" == typeof e.newline_char
              ? e.newline_char
              : "\r?\n",
          s = new RegExp("^(\\[((?:" + n(c) + ")|.)*\\])(?:" + n(c) + "){2}"),
          p = s.test(r) ? s.exec(r)[1] : "";
        t();
        var v = l(p, e);
        for (var g in v) f([g, v[g]]);
        if ("1" === v.SetUp && !("FEN" in v && o(v.FEN, !0))) return !1;
        for (
          var h = function (r) {
              return Array.from(r)
                .map(function (r) {
                  return r.charCodeAt(0) < 128
                    ? r.charCodeAt(0).toString(16)
                    : encodeURIComponent(r).replace(/\%/g, "").toLowerCase();
                })
                .join("");
            },
            d = function (r) {
              return 0 == r.length
                ? ""
                : decodeURIComponent("%" + r.match(/.{1,2}/g).join("%"));
            },
            E = function (r) {
              return (
                (r = r.replace(new RegExp(n(c), "g"), " ")),
                `{${h(r.slice(1, r.length - 1))}}`
              );
            },
            m = function (r) {
              if (r.startsWith("{") && r.endsWith("}"))
                return d(r.slice(1, r.length - 1));
            },
            _ = r
              .replace(p, "")
              .replace(
                new RegExp(`({[^}]*})+?|;([^${n(c)}]*)`, "g"),
                function (r, e, n) {
                  return void 0 !== e ? E(e) : " " + E(`{${n.slice(1)}}`);
                }
              )
              .replace(new RegExp(n(c), "g"), " "),
            b = /(\([^\(\)]+\))+?/g;
          b.test(_);

        )
          _ = _.replace(b, "");
        (_ = _.replace(/\d+\.(\.\.)?/g, "")),
          (_ = _.replace(/\.\.\./g, "")),
          (_ = _.replace(/\$\d+/g, ""));
        var A = K(_).split(new RegExp(/\s+/));
        A = A.join(",").replace(/,,+/g, ",").split(",");
        for (var y = "", S = 0; S < A.length - 1; S++) {
          var I = m(A[S]);
          if (void 0 === I) {
            if (((y = w(A[S], a)), null == y)) return !1;
            C(y);
          } else mr[u()] = I;
        }
        if (
          ((I = m(A[A.length - 1])),
          void 0 !== I && ((mr[u()] = I), A.pop()),
          (y = A[A.length - 1]),
          z.indexOf(y) > -1)
        )
          i(Er) && void 0 === Er.Result && f(["Result", y]);
        else {
          if (((y = w(y, a)), null == y)) return !1;
          C(y);
        }
        return !0;
      },
      header: function () {
        return f(arguments);
      },
      ascii: function () {
        return P();
      },
      turn: function () {
        return sr;
      },
      move: function (r, e) {
        var n = void 0 !== e && "sloppy" in e && e.sloppy,
          t = null;
        if ("string" == typeof r) t = w(r, n);
        else if ("object" == typeof r)
          for (var o = v(), i = 0, u = o.length; i < u; i++)
            if (
              !(
                r.from !== O(o[i].from) ||
                r.to !== O(o[i].to) ||
                ("promotion" in o[i] && r.promotion !== o[i].promotion)
              )
            ) {
              t = o[i];
              break;
            }
        if (!t) return null;
        var f = q(t);
        return C(t), f;
      },
      ugly_move: function (r, e) {
        var n = q(r);
        return C(r), n;
      },
      undo: function () {
        var r = I();
        return r ? q(r) : null;
      },
      clear: function () {
        return e();
      },
      put: function (r, e) {
        return c(r, e);
      },
      get: function (r) {
        return a(r);
      },
      remove: function (r) {
        return s(r);
      },
      perft: function (r) {
        return Q(r);
      },
      square_color: function (r) {
        if (r in fr) {
          var e = fr[r];
          return (R(e) + L(e)) % 2 == 0 ? "light" : "dark";
        }
        return null;
      },
      history: function (r) {
        for (
          var e = [], n = [], t = void 0 !== r && ("verbose" in r) && r.verbose;
          dr.length > 0;

        )
          e.push(I());
        for (; e.length > 0; ) {
          var o = e.pop();
          t ? n.push(q(o)) : n.push(g(o)), C(o);
        }
        return n;
      },
      get_comment: function () {
        return mr[u()];
      },
      set_comment: function (r) {
        mr[u()] = r.replace("{", "[").replace("}", "]");
      },
      delete_comment: function () {
        var r = mr[u()];
        return delete mr[u()], r;
      },
      get_comments: function () {
        return (
          n(),
          Object.keys(mr).map(function (r) {
            return { fen: r, comment: mr[r] };
          })
        );
      },
      delete_comments: function () {
        return (
          n(),
          Object.keys(mr).map(function (r) {
            var e = mr[r];
            return delete mr[r], { fen: r, comment: e };
          })
        );
      },
    }
  );
};
"undefined" != typeof exports && (exports.Chess = Chess),
  "undefined" != typeof define &&
    define(function () {
      return Chess;
    });
