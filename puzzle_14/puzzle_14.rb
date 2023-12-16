dish = File.readlines('test.txt', chomp: true)

@load = 0

def let_rocks_slide(dish)
  dish.each do |line|
    space = nil
    max_load = line.length
    line.split('').each_with_index do |slot, index|
      space = index if !space && slot == "."
      space = nil if slot == "#"
      if slot == "O" && !space.nil?
        line[space] = "O"
        line[index] = "."
        space += 1
      end
    end
  end
end

def calc_load(dish)
  load = 0
  dish.each do |col|
    col.split('').each_with_index do |item, index|
      if item == "O"
        load += col.length - index
      end
    end
  end
  load
end

tilt_north = dish.map(&:chars).transpose.map(&:join)
dish = let_rocks_slide(tilt_north)
cycle = 1
resluts = []
1000000000.times do
  cycle+=1
  dish = let_rocks_slide(dish.map(&:chars).transpose.map(&:join))
  dish = let_rocks_slide(dish.map(&:chars).reverse.transpose.map(&:join))
  dish = let_rocks_slide(dish.map(&:chars).reverse.transpose.map(&:join))
  dish = dish.map(&:chars).reverse.transpose.map(&:join).reverse

  @load = calc_load(dish)
  dish = let_rocks_slide(dish)
  p cycle
end

p @load